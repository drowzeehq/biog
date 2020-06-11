type Marker = {
  label: string;
  timestamp: number;
};

type Epoch = {
  data: number[][];
  info: {
    startTime: number;
    samplingRate: number;
    channelNames: string[];
    markers?: Marker[];
  };
};

type Sample = {
  data: number[];
  timestamp: number;
};

type EEGSessionInterface = {
  samples: Sample[];
  channelNames: string[];
  samplingRate: number;
  markers: [];
};

export default {
  epochToSamples: (epoch: Epoch) => {
    const session: EEGSessionInterface = {
      samples: [],
      channelNames: epoch.info.channelNames,
      samplingRate: epoch.info.samplingRate,
      markers: [],
    };
    const { data, info } = epoch;
    const { startTime } = info;
    const sampleDelay = 1000 / epoch.info.samplingRate;
    // if (markers && markers.length) {
    //   markers.forEach((marker) => jsonFile.markers.push(marker))
    // }
    data[0].forEach((_, sampleIndex) => {
      const sampleAdjust = sampleIndex * sampleDelay;
      const timestamp = startTime + sampleAdjust;
      const sample: Sample = {
        timestamp,
        data: [],
      };
      for (let i = 0; i < epoch.info.channelNames.length; i++) {
        sample.data.push(data[i][sampleIndex]);
      }
      session.samples.push(sample);
    });
    return session.samples;
  },
};
