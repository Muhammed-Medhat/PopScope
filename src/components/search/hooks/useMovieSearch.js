import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../../../services/modules/tmdb.service";

export function useMovieSearch(query) {
  const trimmed = query?.trim() ?? "";

  return useQuery({
    queryKey: ["search", trimmed],
    queryFn: ({ signal }) =>
      tmdbService.getMovieBySearch(encodeURIComponent(trimmed), signal),
    select: (res) => res.data.results || [],
    enabled: trimmed.length > 0,
  });
}
