# kap-recording-name [![Build Status](https://travis-ci.org/karaggeorge/kap-recording-name.svg?branch=master)](https://travis-ci.org/karaggeorge/kap-recording-name)

> [Kap](https://github.com/wulkano/kap) plugin - Create meaningful names for your recordings


## Install

In the `Kap` menu, go to `Preferences…`, select the `Plugins` pane, find this plugin, and toggle it.


## Usage

In the cropper or by right clicking the tray icon, click the `…` icon, then `Plugins` and make sure `Rename recording` is enabled.

## Templating

The templating service used by this plugin is [`string-template`](https://github.com/Matt-Esch/string-template). Including any of the following in your template string will be replaced by the appropriate value:

- `{date}` - Will be replaced with the current date. The format can be controlled and can be a valid [Moment.js](https://github.com/moment/moment/) format
- `{time}` - Will be replaced with the current time. The format can be controlled and can be a valid [Moment.js](https://github.com/moment/moment/) format
- `{clipboard}` - Will be replaced by the contents of the clipboard at the start of the recording. Can be useful if you want to copy a PR number or any other identifiable message that can be used in the file name
- `{color}` - Will be replaced with a random color
- `{adjective}` - Will be replaced with a random adjective
- `{animal}` - Will be replaced with a random animal
- `{country}` - Will be replaced with a random country
- `{name}` - Will be replaced with a random name
- `{starWars}` - Will be replaced with a random Star Wars character

To find the possible values of the random words, have a look [here](https://github.com/andreasonny83/unique-names-generator/tree/master/src/dictionaries)

You can escape {} pairs by using double {{}}, so `{{text}}` will result in `{text}`

