import path from 'path';
import { $, usePowerShell } from 'zx';
usePowerShell();

export const getVideoDuration = async (input: string) => {
  const { stdout } =
    await $`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${slash(
      input
    )}`;
  return stdout.trim();
};

export const encodeHLS = async (input: string, outDir: string) => {
  const outputSegmentPath = path.join(outDir, 'v%v/file%d.ts');
  const outputPath = path.join(outDir, 'v%v/index.m3u8');

  await $`
  ffmpeg -i ${slash(input)} \
  -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 \
  -c:v libx264 -crf 22 -c:a aac -ar 48000 \
  -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k \
  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k \
  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k \
  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" \
  -preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 \
  -hls_flags independent_segments -master_pl_name "master.m3u8" \
  -hls_segment_filename ${slash(outputSegmentPath)} ${slash(outputPath)}
  `;
};

const slash = (path: string): string => {
  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
};
