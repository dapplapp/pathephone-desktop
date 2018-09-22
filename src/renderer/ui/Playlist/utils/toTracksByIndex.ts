import { IPlaylistTracksByIndex } from '~renderer/ui/Playlist/types';
import getRandomBoolean from '~shared/utils/getRandomBoolean';

export const toShuffleOrder: (t: IPlaylistTracksByIndex, i: string | null) => string[] = (
  (tracksByIndex: IPlaylistTracksByIndex, currentTrackIndex: string): string[] => {
    const shuffleOrder: string[] = Object.keys(tracksByIndex);
    const withoutCurrent: string[] = shuffleOrder.filter(
      (key: string) => key !== currentTrackIndex
    );
    withoutCurrent.sort(() => {
      if (getRandomBoolean()) {
        return -1;
      }

      return 1;
    });
    withoutCurrent.unshift(currentTrackIndex);

    return withoutCurrent;
  }
);
