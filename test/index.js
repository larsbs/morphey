import { expect } from 'chai';
import morphey from '../src/index';


describe('MAIN', function () {
  describe('morphey(obj, translations)', function () {
    describe('when translations is an object', function () {
      const originalObject = {
        foo: 'bar',
        from_object: 'wyz',
        this_is_null: null,
        deepProp: {
          y: 12,
          x: 13,
        },
        onePropMore: 'test',
        lastProp: 'test',
      };
      const translations = {
        baz: 'foo',
        fromObject: { fromKey: 'from_object' },
        withDefault: { fromKey: 'this_is_null', transform: (v) => v || 'defaultValue' },
        deepX: 'deepProp.x',
        deepY: { fromKey: 'deepProp.y', transform: (v) => v * 10 },
        'lastProps.first': 'onePropMore',
        'lastProps.second': 'lastProp',
        computed: { value: () => 'computedValue' }
      };
      let finalObject;
      before(function () {
        finalObject = morphey(originalObject, translations);
      });
      it('should translate the name of the old key when the new name is a string', function () {
        expect(finalObject.baz).to.exist;
        expect(finalObject.baz).to.equal('bar');
      });
      it('should translate the name of the old key when the new name is inside an object with the prop `fromKey`', function () {
        expect(finalObject.fromObject).to.exist;
        expect(finalObject.fromObject).to.equal('wyz');
      });
      it('should apply transformations to the value of the key when the prop `transform` is present', function () {
        expect(finalObject.withDefault).to.exist;
        expect(finalObject.withDefault).to.equal('defaultValue');
      });
      it('should allow dot notation to be used when specifiying the old key name', function () {
        expect(finalObject.deepX).to.exist;
        expect(finalObject.deepX).to.equal(13);
        expect(finalObject.deepY).to.exist;
        expect(finalObject.deepY).to.equal(12 * 10);
      });
      it('should allow to define nested properties on the final object using dot notation in the new names', function () {
        expect(finalObject.lastProps).to.exist;
        expect(finalObject.lastProps.first).to.exist;
        expect(finalObject.lastProps.second).to.exist;
        expect(finalObject.lastProps.first).to.equal('test');
        expect(finalObject.lastProps.second).to.equal('test');
      });
      it('should allow to have computed values when using `value` in the transformations', function () {
        expect(finalObject.computed).to.exist;
        expect(finalObject.computed).to.equal('computedValue');
      });
    });
    describe('when translations is a function', function () {
      const originalObject = {
        foo: 'bar',
        from_object: 'wyz',
        this_is_null: null,
        deepProp: {
          y: 12,
          x: 13,
        },
        onePropMore: 'test',
        lastProp: 'test',
      };
      const translations = (obj) => ({
        baz: { fromKey: 'foo', transform: () => obj.foo },
        fromObject: { fromKey: 'from_object' },
        withDefault: { fromKey: 'this_is_null', transform: (v) => v || 'defaultValue' },
        deepX: 'deepProp.x',
        deepY: { fromKey: 'deepProp.y', transform: (v) => v * 10 },
        'lastProps.first': 'onePropMore',
        'lastProps.second': 'lastProp',
        computed: { value: () => 'computedValue' }
      });
      let finalObject;
      before(function () {
        finalObject = morphey(originalObject, translations);
      });
      it('should translate the name of the old key when the new name is a string', function () {
        expect(finalObject.baz).to.exist;
        expect(finalObject.baz).to.equal('bar');
      });
      it('should translate the name of the old key when the new name is inside an object with the prop `fromKey`', function () {
        expect(finalObject.fromObject).to.exist;
        expect(finalObject.fromObject).to.equal('wyz');
      });
      it('should apply transformations to the value of the key when the prop `transform` is present', function () {
        expect(finalObject.withDefault).to.exist;
        expect(finalObject.withDefault).to.equal('defaultValue');
      });
      it('should allow dot notation to be used when specifiying the old key name', function () {
        expect(finalObject.deepX).to.exist;
        expect(finalObject.deepX).to.equal(13);
        expect(finalObject.deepY).to.exist;
        expect(finalObject.deepY).to.equal(12 * 10);
      });
      it('should allow to define nested properties on the final object using dot notation in the new names', function () {
        expect(finalObject.lastProps).to.exist;
        expect(finalObject.lastProps.first).to.exist;
        expect(finalObject.lastProps.second).to.exist;
        expect(finalObject.lastProps.first).to.equal('test');
        expect(finalObject.lastProps.second).to.equal('test');
      });
      it('should allow to have computed values when using `value` in the transformations', function () {
        expect(finalObject.computed).to.exist;
        expect(finalObject.computed).to.equal('computedValue');
      });
    });
  });
});
