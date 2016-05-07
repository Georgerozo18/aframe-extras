/**
 * Flat-shaded ocean primitive.
 *
 * Based on a Codrops tutorial:
 * http://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
 */
module.exports.Primitive = {
  defaultAttributes: {
    tube:           {},
  },
  mappings: {
    path:           'tube.path',
    segments:       'tube.segments',
    radius:         'tube.radius',
    radialSegments: 'tube.radialSegments',
    closed:         'tube.closed'
  }
};

module.exports.Component = {
  schema: {
    path:           {default: []},
    segments:       {default: 64},
    radius:         {default: 1},
    radialSegments: {default: 8},
    closed:         {default: false}
  },

  init: function () {
    var el = this.el,
        data = this.data,
        material = el.components.material;

    if (!data.path.length) {
      console.error('[a-tube] `path` property expected but not found.');
      return;
    }

    var curve = new THREE.CatmullRomCurve3(data.path.map(function (point) {
      point = point.split(' ');
      return new THREE.Vector3(Number(point[0]), Number(point[1]), Number(point[2]));
    }));
    var geometry = new THREE.TubeGeometry(
      curve, data.segments, data.radius, data.radialSegments, data.closed
    );

    if (!material) {
      material = {};
      material.material = new THREE.MeshPhongMaterial();
    }

    this.mesh = new THREE.Mesh(geometry, material.material);
    this.el.setObject3D('mesh', this.mesh);
  },

  remove: function () {
    if (this.mesh) this.el.removeObject3D('mesh');
  }
};
