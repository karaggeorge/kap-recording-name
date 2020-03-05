'use strict';
const moment = require('moment');
const {clipboard} = require('electron');
const sanitize = require('sanitize-filename');
const {
  uniqueNamesGenerator,
  ...dictionaries
} = require('unique-names-generator');
const template = require('string-template');

const dictionaryMap = new Map([
  ['color', 'colors'],
  ['adjective', 'adjectives'],
  ['animal', 'animals'],
  ['country', 'countries'],
  ['name', 'names'],
  ['starWars', 'starWars']
]);

const config = {
  nameTemplate: {
    title: 'Template',
    description: 'Used to generate the file name. For available all options read here: ',
    type: 'string',
    default: '{date} at {time} - {color} {animal}',
    required: true
  },
  dateFormat: {
    title: 'Date format',
    description: 'Moment.js format for the {date} parameter.',
    type: 'string',
    default: 'YYYY-MM-DD',
    required: true
  },
  timeFormat: {
    title: 'Time format',
    description: 'Moment.js format for the {time} parameter.',
    type: 'string',
    default: 'H.mm.ss',
    required: true
  },
  randomWordStyle: {
    title: 'Random Word Style',
    description: 'Style to use for the generated random words.',
    type: 'string',
    enum: [
      'lowerCase',
      'upperCase',
      'capital'
    ],
    required: true,
    default: 'capital'
  }
};

const willStartRecording = ({state}) => {
  state.clipboardContent = clipboard.readText();
};

const didStopRecording = async ({state, config, setRecordingName}) => {
  const {nameTemplate, dateFormat, timeFormat, randomWordStyle} = config.store;

  const date = moment().format(dateFormat);
  const time = moment().format(timeFormat);

  const generateRandomWord = key => uniqueNamesGenerator({
    dictionaries: [dictionaries[key]],
    length: 1,
    style: randomWordStyle
  });

  const randomValues = [...dictionaryMap.entries()].reduce((acc, [key, value]) => ({
    ...acc,
    [key]: generateRandomWord(value)
  }), {});

  const name = template(nameTemplate, {
    date,
    time,
    clipboard: state.clipboardContent,
    ...randomValues
  });

  setRecordingName(sanitize(name));
};

const renameRecording = {
  title: 'Rename recording',
  config,
	willStartRecording,
	didStopRecording
};

exports.recordServices = [renameRecording];
