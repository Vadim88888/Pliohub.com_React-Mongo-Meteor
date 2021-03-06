import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { compose, withProps, withState, lifecycle } from 'recompose';
import { InputGroupButton } from 'reactstrap';

import UploadService from '/imports/ui/utils/uploads/UploadService';

import FileUploader from '../../../components/FileUploader';

const enhance = compose(
  withState('attachments', 'setAttachments', []),
  withProps(({
    slingshotDirective,
    uploaderMetaContext,
    setAttachments,
    onAddFile,
    organizationId,
  }) => ({
    fileUploader: new UploadService({
      slingshotDirective,
      slingshotContext: uploaderMetaContext,
      maxFileSize: Meteor.settings.public.discussionFilesMaxSize,
      fileData: { organizationId },
      hooks: {
        beforeInsert: () => {
          // this.playNewMessageSound();
          setAttachments([]);
        },
        afterInsert: onAddFile,
      },
    }),
  })),
  lifecycle({
    componentWillUpdate(props) {
      _.each(
          props.attachments,
          props.fileUploader.upload,
          props.fileUploader
      );
    },
  })
);

const DiscussionFileUploader = enhance(({ setAttachments }) => (
  <InputGroupButton className="file-uploader">
    <FileUploader onChange={setAttachments} />
  </InputGroupButton>
));

DiscussionFileUploader.propTypes = {
  slingshotDirective: PropTypes.string.isRequired,
  uploaderMetaContext: PropTypes.object.isRequired,
  onAddFile: PropTypes.func.isRequired,
  organizationId: PropTypes.string.isRequired,
};

export default DiscussionFileUploader;
