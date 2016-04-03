# How to set up Kinto

Doing some initial experiments with using [Kinto](http://kinto.readthedocs.org) as a JSON storage API

First deploy a Kinto server on Heroku by following [the instructions on the Kinto site](http://kinto.readthedocs.org/en/latest/get-started.html#deploying-on-cloud-providers). It literally involves two or three mouse clicks.

I called the instance "thatscamping-kinto", so it's available at
http://thatscamping-kinto.herokuapp.com

TODO: Lock down permissions to create new buckets. This needs to be done in the server configuration. It can't be done through the API
