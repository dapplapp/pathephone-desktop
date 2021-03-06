import {
  shareCancelForm,
  shareWaitForDropZoneExists,
  shareDropZoneSelect,
  coverPreviewHasIamge,
  shareFormTracklistLengthEquals,
  validateTrackFields,
  shareWaitForFormExists,
} from '~reusable/sharePage';

import { tracks } from '~shared/data/assets';
import e2e from '~shared/data/e2e';

describe('check form values', () => {
  tracks.forEach((track, index) => {
    describe(`track #${index + 1} selected`, () => {
      before(async function () {
        await shareDropZoneSelect.call(this, track.file);
        await shareWaitForFormExists.call(this);
      });
      it('album cover value matches', async function () {
        const hasImage = await coverPreviewHasIamge.call(this);
        expect(hasImage).equal(track.hasCover);
      });
      it('album artist value matches', async function () {
        const { app } = this;
        const value = await app.client
          .$(e2e.SHARE_FORM_ARTIST_INPUT_ID)
          .getValue();
        expect(value).equal(track.artist);
      });
      it('album title value matches', async function () {
        const { app } = this;
        const value = await app.client
          .$(e2e.SHARE_FORM_TITLE_INPUT_ID)
          .getValue();
        expect(value).equal(track.album);
      });
      it('tracklist has 1 item length', function () {
        return shareFormTracklistLengthEquals.call(this, 1);
      });
      it('track fields values should match', function () {
        return validateTrackFields.call(this, 1, track);
      });

      after(async function () {
        await shareCancelForm.call(this);
        await shareWaitForDropZoneExists.call(this);
      });
    });
  });
});
