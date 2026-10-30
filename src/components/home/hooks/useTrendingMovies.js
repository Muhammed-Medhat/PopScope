import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../../../services/modules/tmdb.service";

export function useTrendingMovies(page) {
  return useQuery({
    queryKey: ["trending", page],
    queryFn: ({ signal }) => tmdbService.getTrending(page, signal),
    select: (res) => {
      const movies = res?.data?.results || [];
      const totalPagesRaw = res?.data?.total_pages || 1;
      return {
        movies,
        totalPages: totalPagesRaw > 500 ? 500 : totalPagesRaw,
      };
    },
    placeholderData: (previousData) => previousData,
  });
}
