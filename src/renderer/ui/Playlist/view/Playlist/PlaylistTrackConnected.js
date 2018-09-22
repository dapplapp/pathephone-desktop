import { connect } from 'react-redux';

import selectors from '#selectors';

import PlaylistTrack from './PlaylistTrack';
import { playlistSelectors, playlistEvents } from '~renderer/ui/Playlist';

const mapStateToProps = state => ({
  currentTrackIndex: playlistSelectors.getCurrentTrackIndex(state),
  tracksByIndex: playlistSelectors.getPlaylistTracksByIndex(state),
  cachedCIDs: selectors.getCachedCIDs(state),
});

const mapDispatchToProps = {
  onPlayTrack: playlistEvents.uiPlaylistTrackPlayed,
  onRemoveTrack: playlistEvents.uiPlaylistTrackRemoved,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { cachedCIDs, tracksByIndex, currentTrackIndex } = stateProps;
  const { index } = ownProps;
  const { audio, ...trackData } = tracksByIndex[index];
  return {
    ...trackData,
    isCurrent: index === currentTrackIndex,
    isDownloaded: !!cachedCIDs[audio],
    order: index,
    onPlayClick() {
      dispatchProps.onPlayTrack(index);
    },
    onRemoveClick() {
      dispatchProps.onRemoveTrack(index);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlaylistTrack);