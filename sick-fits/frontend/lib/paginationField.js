import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
    return {
        keyArgs: false, // Tells Apollo we will take care of everything
        read(existing = [], { args, cache }) {
            console.log({ existing, args, cache });
            const { skip, first } = args;

            // Read the number of items on the page from the cache
            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?._allProductsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);

            // Check if we have existing items
            const items = existing.slice(skip, skip + first).filter((x) => x);
            // if there are items, and there aren't enough items to satisfy how many were requested and we are on the last page
            // then just send it
            if (items.length && items.length !== first && page === pages) {
                return items;
            }
            if (items.length !== first) {
                // we dont have any items we must go to the network to fetch them
                return false;
            }

            // if there are items, just return them from the cache, and we don't need to go to the network
            if (items.length) {
                console.log(
                    `there are ${items.length} items in the cache! Gonna send them to Apollo`
                );
                return items;
            }

            return false; // fallback to network

            // first thing it does is ask the read function for those items
            // We can either do one of two things:
            // First thing we can do is return the items because they are already in the cache
            // The second thing we can do is return false from here, which will make a network request
        },
        merge(existing, incoming, { args }) {
            const { skip, first } = args;
            // This runs when the Apollo client comes back from the network with our products
            // It's our opportunity to say how we want to put them back into the cache
            console.log(`merging items from the network ${incoming.length}`);
            const merged = existing ? existing.slice(0) : [];
            for (let i = skip; i < skip + incoming.length; ++i) {
                merged[i] = incoming[i - skip];
            }
            console.log(merged);

            // Finally we return the merged items from the cache
            return merged;
        },
    };
}
