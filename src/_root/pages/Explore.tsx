// import GridPostList from "@/components/shared/GridPostList";
// import Loader from "@/components/shared/Loader";

// import { Input } from "@/components/ui/input";
// import useDebounce from "@/hooks/useDebounce";
// import {
//   useGetPosts,
//   useSearchPosts,
// } from "@/lib/react-query/queriesAndMutation";
// import { Models } from "appwrite";
// import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";

// export type SearchResultProps = {
//   isSearchFetching: boolean;
//   searchedPosts: Models.Document[];
// };

// const SearchResults = ({
//   isSearchFetching,
//   searchedPosts,
// }: SearchResultProps) => {
//   if (isSearchFetching) {
//     return <Loader />;
//   } else if (searchedPosts && searchedPosts.documents?.length > 0) {
//     return <GridPostList posts={searchedPosts.documents} />;
//   } else {
//     return (
//       <p className="text-light-4 mt-10 text-center w-full">No results found</p>
//     );
//   }
// };
// const Explore = () => {
//   const { ref, inView } = useInView();

//   const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

//   const [searchValue, setSearchValue] = useState("");

//   const debouncedValue = useDebounce(searchValue, 500);

//   const { data: searchedPosts, isFetching: isSearchFetching } =
//     useSearchPosts(debouncedValue);

//   useEffect(() => {
//     if (inView && !searchValue) fetchNextPage();
//   }, [inView, searchValue]);

//   if (!posts) {
//     return (
//       <div className="flex-center w-full h-full">
//         <Loader />
//       </div>
//     );
//   }

//   const shouldShowSearchResults = searchValue !== "";
//   const shouldShowPosts =
//     !shouldShowSearchResults &&
//     posts.pages.every((item) => item?.documents.length === 0);

//   return (
//     <div className="explore-container">
//       <div className="explore-inner_container">
//         <h2 className="h3-bold md:h2-bold w-full ">Search Posts</h2>
//         <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
//           <img
//             src="/public/assets/icons/search.svg"
//             width={24}
//             height={24}
//             alt="search"
//           />
//           <Input
//             type="text"
//             placeholder="Search"
//             className="explore-search"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="flex-between w-full max-w-5xl mt-16 mb-7">
//         <h3 className="body-bold md:h3-bold">Popular Today</h3>
//         <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
//           <p className="small-medium md:base-medium text-light-2">All</p>
//           <img
//             src="/public/assets/icons/filter.svg"
//             alt="filter"
//             width={20}
//             height={20}
//           />
//         </div>
//       </div>
//       {/* <div className="flex flex-wrap gap-9 w-full max-w-5xl">
//         {shouldShowSearchResults ? (
//           <SearchResults
//             isSearchFetching={isSearchFetching}
//             searchedPosts={searchedPosts}
//           />
//         ) : shouldShowPosts ? (
//           <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
//         ) : (
//           posts.pages.map((item, index) => (
//             <GridPostList key={`page-${index}`} posts={item?.documents} />
//           ))
//         )}
//       </div> */}

//       <div className="flex flex-wrap gap-9 w-full max-w-5xl">
//         {shouldShowSearchResults ? (
//           <SearchResults
//             isSearchFetching={isSearchFetching}
//             searchedPosts={searchedPosts?.documents || []}
//           />
//         ) : shouldShowPosts ? (
//           <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
//         ) : (
//           posts.pages.map((item, index) => (
//             <GridPostList key={`page-${index}`} posts={item?.documents || []} />
//           ))
//         )}
//       </div>
//       {hasNextPage && !searchValue && (
//         <div ref={ref} className="mt-10">
//           <Loader />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Explore;

import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Adjusted type definition to make sure it's just an array of Documents
export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[]; // Document[] rather than an object
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts.length > 0) {
    // directly check length on array
    return <GridPostList posts={searchedPosts} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/public/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/public/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents || []} // Provide a fallback empty array
          />
        ) : shouldShowPosts ? (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents || []} /> // Provide fallback empty array for documents
          ))
        ) : (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
