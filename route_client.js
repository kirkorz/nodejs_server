var PROTO_PATH = __dirname + '/../protos/route_guide.proto';

var async = require('async');
var fs = require('fs');
var parseArgs = require('minimist');
var path = require('path');
var _ = require('lodash');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var COORD_FACTOR = 1e7;

var routeguide = grpc.loadPackageDefinition(packageDefinition).routeguide;
var client = new routeguide.RouteGuide('localhost:50051',
                                       grpc.credentials.createInsecure());
var point = {latitude: 409146138, longitude: -746188906};
client.getFeature(point, function(err, feature) {
  if (err) {
    console.log(err);
  } else {
    console.log('Found feature called "' + feature.name + '" at ' +
    feature.location.latitude/COORD_FACTOR + ', ' +
    feature.location.longitude/COORD_FACTOR);
  }
});

