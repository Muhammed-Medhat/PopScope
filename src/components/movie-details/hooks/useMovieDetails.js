import { useQuery } from "@tanstack/react-query";
import { tmdbService } from "../../../services/modules/tmdb.service";

export function useMovieDetails(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async ({ signal }) => {
      const [detailsRes, videosRes] = await Promise.all([
        tmdbService.getMovieDetails(id, signal),
        tmdbService.getMovieVideo(id, signal),
      ]);
      return { details: detailsRes.data, videos: videosRes.data };
    },
    select: ({ details, videos }) => {
      const cast = details.credits?.cast?.slice(0, 8) || [];
      const trailer = videos.results?.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer",
      );
      return {
        movie: details,
        cast,
        trailerKey: trailer ? trailer.key : null,
      };
    },
    enabled: Boolean(id),
    placeholderData: (previousData) => previousData,
  });
}
