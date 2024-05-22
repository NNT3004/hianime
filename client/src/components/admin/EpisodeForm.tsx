import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/EpisodeForm';
import {
  InputNumber,
  Input,
  DatePicker,
  Upload,
  TimePicker,
  Progress,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PrimaryButton from '../../components/PrimaryButton';
import { FaCheckDouble } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Episode } from '../../pages/admin/Episodes';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';
const timeFormat = 'HH:mm:ss';

const { Dragger } = Upload;

interface EpisodeFormProps {
  episode: Episode;
  onSubmit: (episode: Episode, video?: UploadFile) => void;
  onCancel: () => void;
  progress?: number;
  loading?: boolean;
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({
  episode,
  onCancel,
  onSubmit,
  progress,
  loading,
}) => {
  const [dumpEpisode, setDumpEpisode] = useState<Episode>(episode);
  const [date, setDate] = useState({
    releaseDate: formatDateToYMD(new Date(dumpEpisode.releaseDate)),
    releaseTime: new Date(dumpEpisode.releaseDate).toTimeString(),
  });
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDumpEpisode({ ...dumpEpisode, [e.target.id]: e.target.value });
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const props: UploadProps = {
    name: 'video',
    multiple: false,
    beforeUpload() {
      return false;
    },
    onChange({ file }) {
      if (!file.name) {
        setFileList([]);
      } else if (file.name.endsWith('.mp4')) {
        setFileList([file]);
      }
    },
    onRemove() {
      setFileList([]);
    },
    fileList: fileList,
    accept: '.mp4',
    style: {
      color: '#eee',
    },
    disabled: loading,
  };
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='for-what'>
          {episode._id ? 'Edit episode' : 'Add episode'}
        </p>
        <div className='form-row'>
          <label htmlFor='ep-number'>EP Number</label>
          <InputNumber
            value={dumpEpisode.episodeNumber}
            className='input'
            onChange={(episodeNumber) => {
              if (episodeNumber)
                setDumpEpisode({ ...dumpEpisode, episodeNumber });
            }}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            className='input'
            value={dumpEpisode.title}
            onChange={handleOnChange}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='release-date'>Release date</label>
          <DatePicker
            value={dayjs(date.releaseDate, dateFormat)}
            format={dateFormat}
            id='release-date'
            className='input'
            onChange={(_, dateString) => {
              if (typeof dateString === 'string') {
                setDate({ ...date, releaseDate: dateString });
              }
            }}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='release-time'>Release time</label>
          <TimePicker
            value={dayjs(date.releaseTime, timeFormat)}
            format={timeFormat}
            id='release-time'
            className='input'
            onChange={(_, dateString) => {
              if (typeof dateString === 'string') {
                setDate({ ...date, releaseTime: dateString });
              }
            }}
            disabled={loading}
          />
        </div>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text' style={{ color: '#eeeeee' }}>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint' style={{ color: '#eeeeee' }}>
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        {progress && <Progress percent={progress} style={{ width: '100%' }} />}
        {dumpEpisode.path && (
          <MediaPlayer
            title='Sprite Fight'
            src={'/' + dumpEpisode.path}
            style={{marginTop: '50px'}}
          >
            <MediaProvider />
            <DefaultVideoLayout
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        )}
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaCheckDouble}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              onSubmit(
                {
                  ...dumpEpisode,
                  releaseDate: combineDateAndTime(
                    date.releaseDate,
                    date.releaseTime
                  ),
                },
                fileList.length === 1 ? fileList[0] : undefined
              );
            }}
            disabled={loading}
          >
            {episode._id ? 'Update' : 'Add'}
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaTimes}
            className='btn-cancel'
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default EpisodeForm;

function combineDateAndTime(dateStr: string, timeStr: string) {
  const date = new Date(dateStr);
  const timeParts = timeStr.split(':');

  date.setHours(parseInt(timeParts[0], 10));
  date.setMinutes(parseInt(timeParts[1], 10));
  if (timeParts.length === 3) {
    date.setSeconds(parseInt(timeParts[2], 10));
  } else {
    date.setSeconds(0);
  }

  return date.toISOString();
}

function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}
