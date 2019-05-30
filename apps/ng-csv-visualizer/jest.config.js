module.exports = {
  name: 'ng-csv-visualizer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-csv-visualizer',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
