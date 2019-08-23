/**
 * @name pc
 * @namespace
 * @description Root namespace for the PlayCanvas Engine
 */
declare namespace pc {
    /**
     * @constructor
     * @name pc.Node
     * @classdesc A animation node has a name and contains an array of keyframes.
     * @description Create a new animation node.
     */
    class Node {
    }
    /**
     * @constructor
     * @name pc.Animation
     * @classdesc An animation is a sequence of keyframe arrays which map to the nodes of a skeletal hierarchy.
     * It controls how the nodes of the hierarchy are transformed over time.
     * @property {String} name Human-readable name of the animation
     * @property {Number} duration Duration of the animation in seconds.
     */
    class Animation {
        /**
         * @function
         * @name pc.Animation#getNode
         * @description Gets a {@link pc.Node} by name
         * @param {String} name The name of the pc.Node
         * @returns {pc.Node} The pc.Node with the specified name
         */
        getNode(name: string): pc.Node;
        /**
         * @readonly
         * @name pc.Animation#nodes
         * @type pc.Node[]
         * @description A read-only property to get array of animation nodes
         */
        readonly nodes: pc.Node[];
        /**
         * @function
         * @name pc.Animation#addNode
         * @description Adds a node to the internal nodes array.
         * @param {pc.Node} node The node to add.
         */
        addNode(node: pc.Node): void;
    }
    /**
     * @constructor
     * @name pc.Skeleton
     * @classdesc Represents a skeleton used to play animations.
     * @param {pc.GraphNode} graph The root pc.GraphNode of the skeleton.
     * @property {Boolean} looping Determines whether skeleton is looping its animation.
     */
    class Skeleton {
        constructor(graph: pc.GraphNode);
        /**
         * @function
         * @name pc.Skeleton#addTime
         * @description Progresses the animation assigned to the specified skeleton by the
         * supplied time delta. If the delta takes the animation passed its end point, if
         * the skeleton is set to loop, the animation will continue from the beginning.
         * Otherwise, the animation's current time will remain at its duration (i.e. the
         * end).
         * @param {Number} delta The time in seconds to progress the skeleton's animation.
         */
        addTime(delta: number): void;
        /**
         * @function
         * @name pc.Skeleton#blend
         * @description Blends two skeletons together.
         * @param {pc.Skeleton} skel1 Skeleton holding the first pose to be blended.
         * @param {pc.Skeleton} skel2 Skeleton holding the second pose to be blended.
         * @param {Number} alpha The value controlling the interpolation in relation to the two input
         * skeletons. The value is in the range 0 to 1, 0 generating skel1, 1 generating skel2 and anything
         * in between generating a spherical interpolation between the two.
         */
        blend(skel1: pc.Skeleton, skel2: pc.Skeleton, alpha: number): void;
        /**
         * @name pc.Skeleton#animation
         * @type pc.Animation
         * @description Animation currently assigned to skeleton.
         */
        animation: pc.Animation;
        /**
         * @name pc.Skeleton#currentTime
         * @type Number
         * @description Current time of currently active animation in seconds.
         * This value is between zero and the duration of the animation.
         */
        currentTime: number;
        /**
         * @readonly
         * @name pc.Skeleton#numNodes
         * @type Number
         * @description Read-only property that returns number of nodes of a skeleton.
         */
        readonly numNodes: number;
        /**
         * @function
         * @name pc.Skeleton#setGraph
         * @description Links a skeleton to a node hierarchy. The nodes animated skeleton are
         * then subsequently used to drive the local transformation matrices of the node
         * hierarchy.
         * @param {pc.GraphNode} graph The root node of the graph that the skeleton is to drive.
         */
        setGraph(graph: pc.GraphNode): void;
        /**
         * @function
         * @name pc.Skeleton#updateGraph
         * @description Synchronizes the currently linked node hierarchy with the current state of the
         * skeleton. Internally, this function converts the interpolated keyframe at each node in the
         * skeleton into the local transformation matrix at each corresponding node in the linked node
         * hierarchy.
         */
        updateGraph(): void;
    }
    /**
     * @name pc.AssetReference
     * @description An object that manages the case where an object holds a reference to an asset and needs to be notified when
     * changes occur in the asset. e.g. notifications include load, add and remove events.
     * @param {String} propertyName The name of the property that the asset is stored under, passed into callbacks to enable updating.
     * @param {pc.Asset|Object} parent The parent object that contains the asset reference, passed into callbacks to enable updating. Currently an asset, but could be component or other.
     * @param {pc.AssetRegistry} registry The asset registry that stores all assets.
     * @param {Object} callbacks A set of functions called when the asset state changes: load, add, remove.
     * @param {Object} [callbacks.load] The function called when the asset loads load(propertyName, parent, asset).
     * @param {Object} [callbacks.add] The function called when the asset is added to the registry add(propertyName, parent, asset).
     * @param {Object} [callbacks.remove] The function called when the asset is remove from the registry remove(propertyName, parent, asset).
     * @param {Object} scope The scope to call the callbacks in
     * @property {Number} id Get or set the asset id which this references. One of either id or url must be set to initialize an asset reference.
     * @property {String} url Get or set the asset url which this references. One of either id or url must be called to initialize an asset reference.
     * @example
     *
     * var reference = new pc.AssetReference('textureAsset', this, this.app.assets, {
     *     load: this.onTextureAssetLoad,
     *     add: this.onTextureAssetAdd,
     *     remove: this.onTextureAssetRemove
     * }, this);
     * reference.id = this.textureAsset.id;
     */
    var AssetReference: {
        id: number;
        url: string;
    };
    /**
     * @constructor
     * @name pc.AssetRegistry
     * @classdesc Container for all assets that are available to this application
     * @description Create an instance of an AssetRegistry.
     * Note: PlayCanvas scripts are provided with an AssetRegistry instance as 'app.assets'.
     * @param {pc.ResourceLoader} loader The ResourceLoader used to load the asset files.
     * @property {String} prefix A URL prefix that will be added to all asset loading requests.
     */
    class AssetRegistry {
        constructor(loader: pc.ResourceLoader);
        /**
         * @function
         * @name pc.AssetRegistry#list
         * @description Create a filtered list of assets from the registry
         * @param {Object} filters Properties to filter on, currently supports: 'preload: true|false'
         * @returns {pc.Asset[]} The filtered list of assets.
         */
        list(filters: any): pc.Asset[];
        /**
         * @function
         * @name pc.AssetRegistry#add
         * @description Add an asset to the registry
         * @param {pc.Asset} asset The asset to add
         * @example
         * var asset = new pc.Asset("My Asset", "texture", {url: "../path/to/image.jpg"});
         * app.assets.add(asset);
         */
        add(asset: pc.Asset): void;
        /**
         * @function
         * @name pc.AssetRegistry#remove
         * @description Remove an asset from the registry
         * @param {pc.Asset} asset The asset to remove
         * @returns {Boolean} True if the asset was successfully removed and false otherwise
         * @example
         * var asset = app.assets.get(100);
         * app.assets.remove(asset);
         */
        remove(asset: pc.Asset): boolean;
        /**
         * @function
         * @name pc.AssetRegistry#get
         * @description Retrieve an asset from the registry by its id field
         * @param {Number} id the id of the asset to get
         * @returns {pc.Asset} The asset
         * @example
         * var asset = app.assets.get(100);
         */
        get(id: number): pc.Asset;
        /**
         * @function
         * @name pc.AssetRegistry#getByUrl
         * @description Retrieve an asset from the registry by it's file's URL field
         * @param {String} url The url of the asset to get
         * @returns {pc.Asset} The asset
         * @example
         * var asset = app.assets.getByUrl("../path/to/image.jpg");
         */
        getByUrl(url: string): pc.Asset;
        /**
         * @function
         * @name pc.AssetRegistry#load
         * @description Load the asset's file from a remote source. Listen for "load" events on the asset to find out when it is loaded
         * @param {pc.Asset} asset The asset to load
         * @example
         * // load some assets
         * var toload = [app.assets.find("My Asset"), app.assets.find("Another Asset")]
         * var count = 0;
         * for (var i = 0; i < toload.length; i++) {
         *     var asset = toload[i];
         *     asset.ready(function (asset) {
         *         count++;
         *         if (count === toload.length) {
         *             // done
         *         }
         *     });
         *     app.assets.load(asset)
         * }
         */
        load(asset: pc.Asset): void;
        /**
         * @function
         * @name pc.AssetRegistry#loadFromUrl
         * @description Use this to load and create an asset if you don't have assets created. Usually you would only use this
         * if you are not integrated with the PlayCanvas Editor
         * @param {String} url The url to load
         * @param {String} type The type of asset to load
         * @param {Function} callback Function called when asset is loaded, passed (err, asset), where err is null if no errors were encountered
         * @example
         * app.assets.loadFromUrl("../path/to/texture.jpg", "texture", function (err, asset) {
         *     var texture = asset.resource;
         * });
         */
        loadFromUrl(url: string, type: string, callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.AssetRegistry#findAll
         * @description Return all Assets with the specified name and type found in the registry
         * @param {String} name The name of the Assets to find
         * @param {String} [type] The type of the Assets to find
         * @returns {pc.Asset[]} A list of all Assets found
         * @example
         * var assets = app.assets.findAll("myTextureAsset", "texture");
         * console.log("Found " + assets.length + " assets called " + name);
         */
        findAll(name: string, type?: string): pc.Asset[];
        /**
         * @function
         * @name pc.AssetRegistry#findByTag
         * @description Return all Assets that satisfy the search query.
         * Query can be simply a string, or comma separated strings,
         * to have inclusive results of assets that match at least one query.
         * A query that consists of an array of tags can be used to match assets that have each tag of array
         * @param {String} tag Name of a tag or array of tags
         * @returns {pc.Asset[]} A list of all Assets matched query
         * @example
         * var assets = app.assets.findByTag("level-1");
         * // returns all assets that tagged by `level-1`
         * @example
         * var assets = app.assets.findByTag("level-1", "level-2");
         * // returns all assets that tagged by `level-1` OR `level-2`
         * @example
         * var assets = app.assets.findByTag([ "level-1", "monster" ]);
         * // returns all assets that tagged by `level-1` AND `monster`
         * @example
         * var assets = app.assets.findByTag([ "level-1", "monster" ], [ "level-2", "monster" ]);
         * // returns all assets that tagged by (`level-1` AND `monster`) OR (`level-2` AND `monster`)
         */
        findByTag(tag: string): pc.Asset[];
        /**
         * @function
         * @name pc.AssetRegistry#filter
         * @description Return all Assets that satisfy filter callback
         * @param {Function} callback The callback function that is used to filter assets, return `true` to include asset to result list
         * @returns {pc.Asset[]} A list of all Assets found
         * @example
         * var assets = app.assets.filter(function(asset) {
         *     return asset.name.indexOf('monster') !== -1;
         * });
         * console.log("Found " + assets.length + " assets, where names contains 'monster'");
         */
        filter(callback: (...params: any[]) => any): pc.Asset[];
        /**
         * @function
         * @name pc.AssetRegistry#find
         * @description Return the first Asset with the specified name and type found in the registry
         * @param {String} name The name of the Asset to find
         * @param {String} [type] The type of the Asset to find
         * @returns {pc.Asset} A single Asset or null if no Asset is found
         * @example
         * var asset = app.assets.find("myTextureAsset", "texture");
         */
        find(name: string, type?: string): pc.Asset;
    }
    /**
     * @constructor
     * @name pc.Asset
     * @classdesc An asset record of a file or data resource that can be loaded by the engine.
     * The asset contains three important fields:<br/>
     * <strong>file</strong>: contains the details of a file (filename, url) which contains the resource data, e.g. an image file for a texture asset<br/>
     * <strong>data</strong>: contains a JSON blob which contains either the resource data for the asset (e.g. material data) or additional data for the file (e.g. material mappings for a model)<br/>
     * <strong>resource</strong>: contains the final resource when it is loaded. (e.g. a {@link pc.StandardMaterial} or a {@link pc.Texture})<br/>
     *
     * See the {@link pc.AssetRegistry} for details on loading resources from assets.
     * @description Create a new Asset record. Generally, Assets are created in the loading process and you won't need to create them by hand.
     * @param {String} name A non-unique but human-readable name which can be later used to retrieve the asset.
     * @param {String} type Type of asset. One of ["animation", "audio", "binary", "cubemap", "css", "font", "json", "html", "material", "model", "script", "shader", "text", "texture"]
     * @param {Object} file Details about the file the asset is made from. At the least must contain the 'url' field. For assets that don't contain file data use null.
     * @example
     * var file = {
     *   filename: "filename.txt",
     *   url: "/example/filename.txt",
     * }
     * @param {Object} [data] JSON object with additional data about the asset (e.g. for texture and model assets) or contains the asset data itself (e.g. in the case of materials)
     * @example
     * var asset = new pc.Asset("a texture", "texture", {
     *     url: "http://example.com/my/assets/here/texture.png"
     * });
     * @property {String} name The name of the asset
     * @property {Number} id The asset id
     * @property {String} type The type of the asset. One of ["animation", "audio", "binary", "cubemap", "css", "font", "json", "html", "material", "model", "script", "shader", "text", "texture"]
     * @property {pc.Tags} tags Interface for tagging. Allows to find assets by tags using {@link pc.AssetRegistry#findByTag} method.
     * @property {Object} file The file details or null if no file
     * @property {String} [file.url] The URL of the resource file that contains the asset data
     * @property {String} [file.filename] The filename of the resource file
     * @property {Number} [file.size] The size of the resource file
     * @property {String} [file.hash] The MD5 hash of the resource file data and the Asset data field
     * @property {Object} data JSON data that contains either the complete resource data (e.g. in the case of a material) or additional data (e.g. in the case of a model it contains mappings from mesh to material)
     * @property {Object} resource A reference to the resource when the asset is loaded. e.g. a {@link pc.Texture} or a {@link pc.Model}
     * @property {Any[]} resources A reference to the resources of the asset when it's loaded. An asset can hold more runtime resources than one e.g. cubemaps
     * @property {Boolean} preload If true the asset will be loaded during the preload phase of application set up.
     * @property {Boolean} loaded True if the resource is loaded. e.g. if asset.resource is not null
     * @property {pc.AssetRegistry} registry The asset registry that this Asset belongs to
     */
    class Asset {
        constructor(name: string, type: string, file: any, data?: any);
        /**
         * @name pc.Asset#getFileUrl
         * @function
         * @description Return the URL required to fetch the file for this asset.
         * @returns {String} The URL
         * @example
         * var assets = app.assets.find("My Image", "texture");
         * var img = "&lt;img src='" + assets[0].getFileUrl() + "'&gt;";
         */
        getFileUrl(): string;
        /**
         * @function
         * @name pc.Asset#ready
         * @description Take a callback which is called as soon as the asset is loaded. If the asset is already loaded the callback is called straight away
         * @param {Function} callback The function called when the asset is ready. Passed the (asset) arguments
         * @param {Object} scope Scope object to use when calling the callback
         * @example
         * var asset = app.assets.find("My Asset");
         * asset.ready(function (asset) {
         *   // asset loaded
         * });
         * app.assets.load(asset);
         */
        ready(callback: (...params: any[]) => any, scope: any): void;
        /**
         * @function
         * @name pc.Asset#unload
         * @description Destroys the associated resource and marks asset as unloaded.
         * @example
         * var asset = app.assets.find("My Asset");
         * asset.unload();
         * // asset.resource is null
         */
        unload(): void;
    }
    /**
     * @constructor
     * @name pc.Color
     * @classdesc Representation of an RGBA color
     * @description Create a new Color object
     * @param {Number} [r] The value of the red component (0-1). If r is an array of length 3 or 4, the array will be used to populate all components.
     * @param {Number} [g] The value of the green component (0-1)
     * @param {Number} [b] The value of the blue component (0-1)
     * @param {Number} [a] The value of the alpha component (0-1)
     * @property {Number} r The red component of the color
     * @property {Number} g The green component of the color
     * @property {Number} b The blue component of the color
     * @property {Number} a The alpha component of the color
     */
    class Color {
        constructor(r?: number, g?: number, b?: number, a?: number);
        /**
         * @function
         * @name pc.Color#clone
         * @description Returns a clone of the specified color.
         * @returns {pc.Color} A duplicate color object
         */
        clone(): pc.Color;
        /**
         * @function
         * @name pc.Color#copy
         * @description Copies the contents of a source color to a destination color.
         * @param {pc.Color} rhs A color to copy to the specified color.
         * @returns {pc.Color} Self for chaining
         * @example
         * var src = new pc.Color(1, 0, 0, 1);
         * var dst = new pc.Color();
         *
         * dst.copy(src);
         *
         * console.log("The two colors are " + (dst.equals(src) ? "equal" : "different"));
         */
        copy(rhs: pc.Color): pc.Color;
        /**
         * @function
         * @name pc.Color#set
         * @description Assign values to the color components, including alpha
         * @param {Number} r The value for red (0-1)
         * @param {Number} g The value for blue (0-1)
         * @param {Number} b The value for green (0-1)
         * @param {Number} [a] The value for the alpha (0-1), defaults to 1
         * @returns {pc.Color} Self for chaining
         */
        set(r: number, g: number, b: number, a?: number): pc.Color;
        /**
         * @function
         * @name pc.Color#lerp
         * @description Returns the result of a linear interpolation between two specified colors
         * @param {pc.Color} lhs The color to interpolate from
         * @param {pc.Color} rhs The color to interpolate to.
         * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
         * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
         * a ray extrapolated from this line.
         * @returns {pc.Color} Self for chaining.
         * @example
         * var a = new pc.Color(0, 0, 0);
         * var b = new pc.Color(1, 1, 0.5);
         * var r = new pc.Color();
         *
         * r.lerp(a, b, 0);   // r is equal to a
         * r.lerp(a, b, 0.5); // r is 0.5, 0.5, 0.25
         * r.lerp(a, b, 1);   // r is equal to b
         */
        lerp(lhs: pc.Color, rhs: pc.Color, alpha: number): pc.Color;
        /**
         * @function
         * @name pc.Color#fromString
         * @description Set the values of the color from a string representation '#11223344' or '#112233'.
         * @param {String} hex A string representation in the format '#RRGGBBAA' or '#RRGGBB'. Where RR, GG, BB, AA are red, green, blue and alpha values.
         * This is the same format used in HTML/CSS.
         * @returns {pc.Color} Self for chaining
         */
        fromString(hex: string): pc.Color;
        /**
         * @function
         * @name pc.Color#toString
         * @description Converts the color to string form. The format is '#RRGGBBAA', where
         * RR, GG, BB, AA are the red, green, blue and alpha values. When the alpha value is not
         * included (the default), this is the same format as used in HTML/CSS.
         * @param {Boolean} alpha If true, the output string will include the alpha value.
         * @returns {String} The color in string form.
         * @example
         * var c = new pc.Color(1, 1, 1);
         * // Should output '#ffffffff'
         * console.log(c.toString());
         */
        toString(alpha: boolean): string;
    }
    /**
     * @name pc.events
     * @namespace
     * @description Namespace for event functions. Use these functions to attach events to an object.
     * @example
     * var obj = { };
     * pc.events.attach(obj);
     *
     * // subscribe to an event
     * obj.on('hello', function(str) {
     *     console.log('event hello is fired', str);
     * });
     *
     * // fire event
     * obj.fire('hello', 'world');
     */
    namespace events {
        /**
         * @function
         * @name pc.events.attach
         * @description Attach event methods 'on', 'off', 'fire', 'once' and 'hasEvent' to the target object
         * @param {Object} target The object to add events to.
         * @returns {Object} The target object
         * @example
         * var obj = { };
         * pc.events.attach(obj);
         */
        function attach(target: any): any;
        /**
         * @function
         * @name pc.events.on
         * @description Attach an event handler to an event
         * @param {String} name Name of the event to bind the callback to
         * @param {Function} callback Function that is called when event is fired. Note the callback is limited to 8 arguments.
         * @param {Object} [scope] Object to use as 'this' when the event is fired, defaults to current this
         * @returns {*} 'this' for chaining
         * @example
         * obj.on('test', function (a, b) {
         *     console.log(a + b);
         * });
         * obj.fire('test', 1, 2); // prints 3 to the console
         */
        function on(name: string, callback: (...params: any[]) => any, scope?: any): any;
        /**
         * @function
         * @name pc.events.off
         * @description Detach an event handler from an event. If callback is not provided then all callbacks are unbound from the event,
         * if scope is not provided then all events with the callback will be unbound.
         * @param {String} [name] Name of the event to unbind
         * @param {Function} [callback] Function to be unbound
         * @param {Object} [scope] Scope that was used as the this when the event is fired
         * @returns {*} 'this' for chaining
         * @example
         * var handler = function () {
         * };
         * obj.on('test', handler);
         *
         * obj.off(); // Removes all events
         * obj.off('test'); // Removes all events called 'test'
         * obj.off('test', handler); // Removes all handler functions, called 'test'
         * obj.off('test', handler, this); // Removes all hander functions, called 'test' with scope this
         */
        function off(name?: string, callback?: (...params: any[]) => any, scope?: any): any;
        /**
         * @function
         * @name pc.events.fire
         * @description Fire an event, all additional arguments are passed on to the event listener
         * @param {Object} name Name of event to fire
         * @param {*} [...] Arguments that are passed to the event handler
         * @returns {*} 'this' for chaining
         * @example
         * obj.fire('test', 'This is the message');
         */
        function fire(name: any): any;
        /**
         * @function
         * @name pc.events.once
         * @description Attach an event handler to an event. This handler will be removed after being fired once.
         * @param {String} name Name of the event to bind the callback to
         * @param {Function} callback Function that is called when event is fired. Note the callback is limited to 8 arguments.
         * @param {Object} [scope] Object to use as 'this' when the event is fired, defaults to current this
         * @returns {*} 'this' for chaining
         * @example
         * obj.once('test', function (a, b) {
         *     console.log(a + b);
         * });
         * obj.fire('test', 1, 2); // prints 3 to the console
         * obj.fire('test', 1, 2); // not going to get handled
         */
        function once(name: string, callback: (...params: any[]) => any, scope?: any): any;
        /**
         * @function
         * @name pc.events.hasEvent
         * @description Test if there are any handlers bound to an event name
         * @param {String} name The name of the event to test
         * @returns {Boolean} true if the object has handlers bound to the specified event name.
         * @example
         * obj.on('test', function () { }); // bind an event to 'test'
         * obj.hasEvent('test'); // returns true
         * obj.hasEvent('hello'); // returns false
         */
        function hasEvent(name: string): boolean;
    }
    /**
     * @name pc.guid
     * @namespace
     * @description Basically a very large random number (128-bit) which means the probability of creating two that clash is vanishingly small.
     * GUIDs are used as the unique identifiers for Entities.
     */
    namespace guid {
        /**
         * @function
         * @name pc.guid.create
         * @description Create an RFC4122 version 4 compliant GUID
         * @returns {String} A new GUID
         */
        function create(): string;
    }
    /**
     * @namespace pc.path
     * @description File path API
     */
    namespace path {
        /**
         * The character that separates path segments
         * @name pc.path.delimiter
         * @type String
         */
        var delimiter: string;
        /**
         * @function
         * @name pc.path.join
         * @description Join two sections of file path together, insert a delimiter if needed.
         * @param {String} one First part of path to join.
         * @param {String} two Second part of path to join.
         * @returns {String} The joined file path.
         */
        function join(one: string, two: string): string;
        /**
         * @function
         * @name  pc.path.normalize
         * @description  Normalize the path by removing '.' and '..' instances
         * @param  {String} path The path to normalize
         * @returns {String} The normalized path
         */
        function normalize(path: string): string;
        /**
         * @function
         * @name pc.path.split
         * @description Split the pathname path into a pair [head, tail] where tail is the final part of the path
         * after the last delimiter and head is everything leading up to that. tail will never contain a slash
         * @param {String} path The path to split.
         * @returns {String[]} The split path which is an array of two strings, the path and the filename.
         */
        function split(path: string): String[];
        /**
         * @function
         * @name pc.path.getBasename
         * @description Return the basename of the path. That is the second element of the pair returned by
         * passing path into {@link pc.path.split}.
         * @param {String} path The path to process.
         * @returns {String} The basename.
         * @example
         * pc.path.getBasename("/path/to/file.txt"); // returns "path.txt"
         * pc.path.getBasename("/path/to/dir"); // returns "dir"
         */
        function getBasename(path: string): string;
        /**
         * @function
         * @name pc.path.getDirectory
         * @description Get the directory name from the path. This is everything up to the final instance of pc.path.delimiter.
         * @param {String} path The path to get the directory from
         * @returns {String} The directory part of the path.
         */
        function getDirectory(path: string): string;
    }
    /**
     * @namespace
     * @name pc.platform
     * @description Global namespace that stores flags regarding platform environment and features support
     * @example
     * if (pc.platform.touch) {
     *     // touch is supported
     * }
     */
    namespace platform {
        /**
         * @name pc.platform.desktop
         * @description is it a desktop or laptop device
         * @type Boolean
         */
        var desktop: boolean;
        /**
         * @name pc.platform.mobile
         * @description is it a mobile or tablet device
         * @type Boolean
         */
        var mobile: boolean;
        /**
         * @name pc.platform.ios
         * @description if it is iOS
         * @type Boolean
         */
        var ios: boolean;
        /**
         * @name pc.platform.android
         * @description if it is Android
         * @type Boolean
         */
        var android: boolean;
        /**
         * @name pc.platform.windows
         * @description if it is Windows
         * @type Boolean
         */
        var windows: boolean;
        /**
         * @name pc.platform.xbox
         * @description if it is Xbox
         * @type Boolean
         */
        var xbox: boolean;
        /**
         * @name pc.platform.gamepads
         * @description if platform supports gamepads
         * @type Boolean
         */
        var gamepads: boolean;
        /**
         * @name pc.platform.touch
         * @description if platform supports touch input
         * @type Boolean
         */
        var touch: boolean;
        /**
         * @name pc.platform.workers
         * @description if the platform supports Web Workers
         * @type Boolean
         */
        var workers: boolean;
    }
    /**
     * @namespace
     * @name pc.string
     * @description Extended String API
     */
    namespace string {
        /**
         * @name pc.string.ASCII_LOWERCASE
         * @description All lowercase letters
         * @type String
         */
        var ASCII_LOWERCASE: string;
        /**
         * @name pc.string.ASCII_UPPERCASE
         * @description All uppercase letters
         * @type String
         */
        var ASCII_UPPERCASE: string;
        /**
         * @name pc.string.ASCII_LETTERS
         * @description All ASCII letters
         * @type String
         */
        var ASCII_LETTERS: string;
        /**
         * @function
         * @name pc.string.format
         * @description Return a string with {n} replaced with the n-th argument
         * @param {String} s The string to format
         * @param {Object} [arguments] All other arguments are substituted into the string
         * @returns {String} The formatted string
         * @example
         * var s = pc.string.format("Hello {0}", "world");
         * console.log(s); // Prints "Hello world"
         */
        function format(s: string, arguments?: any): string;
        /**
         * @function
         * @name pc.string.toBool
         * @description Convert a string value to a boolean. In non-strict mode (the default), 'true' is converted to true, all other values
         * are converted to false. In strict mode, 'true' is converted to true, 'false' is converted to false, all other values will throw
         * an Exception.
         * @param {String} s The string to convert
         * @param {Boolean} [strict] In strict mode an Exception is thrown if s is not an accepted string value. Defaults to false
         * @returns {Boolean} The converted value
         */
        function toBool(s: string, strict?: boolean): boolean;
        /**
         * @function
         * @name pc.string.getCodePoint
         * @description Get the code point number for a character in a string. Polyfill for
         * [<code>codePointAt</code>]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt}.
         * @param {String} string The string to get the code point from
         * @param {Number} [i] The index in the string
         * @returns {Number} The code point value for the character in the string
         */
        function getCodePoint(string: string, i?: number): number;
        /**
         * @function
         * @name pc.string.getCodePoints
         * @description Gets an array of all code points in a string
         * @param {String} string The string to get code points from
         * @returns {Number[]} The code points in the string
         */
        function getCodePoints(string: string): Number[];
        /**
         * @function
         * @name pc.string.getSymbols
         * @description Gets an array of all grapheme clusters (visible symbols) in a string. This is needed because
         * some symbols (such as emoji or accented characters) are actually made up of multiple character codes.
         * @param {String} string The string to break into symbols
         * @returns {String[]} The symbols in the string
         * @see {@link https://mathiasbynens.be/notes/javascript-unicode Unicode strings in JavaScript}
         */
        function getSymbols(string: string): String[];
        /**
         * @function
         * @name pc.string.fromCodePoint
         * @description Get the string for a given code point or set of code points. Polyfill for
         * [<code>fromCodePoint</code>]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint}.
         * @param {...Number} args The code points to convert to a string
         * @returns {String} The converted string
         */
        function fromCodePoint(...args: number[]): string;
    }
    /**
     * @name pc.Tags
     * @class Set of tag names
     * @description Create an instance of a Tags.
     * @param {Object} [parent] Parent object who tags belong to.
     * Note: Tags are used as addition of `pc.Entity` and `pc.Asset` as `tags` field.
     */
    class Tags {
        constructor(parent?: any);
        /**
         * @function
         * @name pc.Tags#add
         * @description Add a tag, duplicates are ignored. Can be array or comma separated arguments for multiple tags.
         * @param {String} name Name of a tag, or array of tags
         * @returns {Boolean} true if any tag were added
         * @example
         * tags.add('level-1');
         * @example
         * tags.add('ui', 'settings');
         * @example
         * tags.add([ 'level-2', 'mob' ]);
         */
        add(name: string): boolean;
        /**
         * @function
         * @name pc.Tags#remove
         * @description Remove tag.
         * @param {String} name Name of a tag or array of tags
         * @returns {Boolean} true if any tag were removed
         * @example
         * tags.remove('level-1');
         * @example
         * tags.remove('ui', 'settings');
         * @example
         * tags.remove([ 'level-2', 'mob' ]);
         */
        remove(name: string): boolean;
        /**
         * @function
         * @name pc.Tags#clear
         * @description Remove all tags.
         * @example
         * tags.clear();
         */
        clear(): void;
        /**
         * @function
         * @name pc.Tags#has
         * @description Check if tags satisfy filters.
         * Filters can be provided by simple name of tag, as well as by array of tags.
         * When an array is provided it will check if tags contain each tag within the array.
         * If any of comma separated argument is satisfied, then it will return true.
         * Any number of combinations are valid, and order is irrelevant.
         * @param {String} name of tag, or array of names
         * @returns {Boolean} true if filters are satisfied
         * @example
         * tags.has('player'); // player
         * @example
         * tags.has('mob', 'player'); // player OR mob
         * @example
         * tags.has([ 'level-1', 'mob' ]); // monster AND level-1
         * @example
         * tags.has([ 'ui', 'settings' ], [ 'ui', 'levels' ]); // (ui AND settings) OR (ui AND levels)
         */
        has(name: string): boolean;
        /**
         * @function
         * @name pc.Tags#list
         * @description Returns immutable array of tags
         * @returns {String[]} copy of tags array
         */
        list(): String[];
        /**
         * @field
         * @readonly
         * @type Number
         * @name pc.Tags#size
         * @description Number of tags in set
         */
        readonly size: number;
    }
    /**
     * @name pc.Application
     * @class Default application which performs general setup code and initiates the main game loop.
     * @description Create a new Application.
     * @param {Element} canvas The canvas element
     * @param {Object} options
     * @param {pc.Keyboard} [options.keyboard] Keyboard handler for input
     * @param {pc.Mouse} [options.mouse] Mouse handler for input
     * @param {pc.TouchDevice} [options.touch] TouchDevice handler for input
     * @param {pc.GamePads} [options.gamepads] Gamepad handler for input
     * @param {String} [options.scriptPrefix] Prefix to apply to script urls before loading
     * @param {String} [options.assetPrefix] Prefix to apply to asset urls before loading
     * @param {Object} [options.graphicsDeviceOptions] Options object that is passed into the {@link pc.GraphicsDevice} constructor
     *
     * @example
     * // Create application
     * var app = new pc.Application(canvas, options);
     * // Start game loop
     * app.start()
     */
    class Application {
        constructor(canvas: Element, options: {
            keyboard?: pc.Keyboard;
            mouse?: pc.Mouse;
            touch?: pc.TouchDevice;
            gamepads?: pc.GamePads;
            scriptPrefix?: string;
            assetPrefix?: string;
            graphicsDeviceOptions?: any;
        });
        /**
         * @name pc.Application#scene
         * @type {pc.Scene}
         * @description The current {@link pc.Scene}
         */
        scene: pc.Scene;
        /**
         * @name pc.Application#timeScale
         * @type {Number}
         * @description Scales the global time delta.
         */
        timeScale: number;
        /**
         * @name pc.Application#maxDeltaTime
         * @type {Number}
         * @description Clamps per-frame delta time to an upper bound. Useful since returning from a tab
         * deactivation can generate huge values for dt, which can adversely affect game state. Defaults
         * to 0.1 (seconds).
         */
        maxDeltaTime: number;
        /**
         * @name pc.Application#assets
         * @type {pc.AssetRegistry}
         * @description The assets available to the application.
         */
        assets: pc.AssetRegistry;
        /**
         * @name pc.Application#graphicsDevice
         * @type {pc.GraphicsDevice}
         * @description The graphics device used by the application.
         */
        graphicsDevice: pc.GraphicsDevice;
        /**
         * @name pc.Application#systems
         * @type {pc.ComponentSystemRegistry}
         * @description The component systems.
         */
        systems: pc.ComponentSystemRegistry;
        /**
         * @name pc.Application#loader
         * @type {pc.ResourceLoader}
         * @description The resource loader.
         */
        loader: pc.ResourceLoader;
        /**
         * @name pc.Application#root
         * @type {pc.Entity}
         * @description The root {@link pc.Entity} of the application.
         */
        root: pc.Entity;
        /**
         * @name pc.Application#keyboard
         * @type {pc.Keyboard}
         * @description The keyboard device.
         */
        keyboard: pc.Keyboard;
        /**
         * @name pc.Application#mouse
         * @type {pc.Mouse}
         * @description The mouse device.
         */
        mouse: pc.Mouse;
        /**
         * @name pc.Application#touch
         * @type {pc.TouchDevice}
         * @description Used to get touch events input.
         */
        touch: pc.TouchDevice;
        /**
         * @name pc.Application#gamepads
         * @type {pc.GamePads}
         * @description Used to access GamePad input.
         */
        gamepads: pc.GamePads;
        /**
         * @name pc.Application#elementInput
         * @type {pc.ElementInput}
         * @description Used to handle input for {@link pc.ElementComponent}s.
         */
        elementInput: pc.ElementInput;
        /**
         * @name pc.Application#scripts
         * @type pc.ScriptRegistry
         * @description The Script Registry of the Application
         */
        scripts: pc.ScriptRegistry;
        /**
         * @name pc.Application#batcher
         * @type pc.BatchManager
         * @description The Batch Manager of the Application
         */
        batcher: pc.BatchManager;
        /**
         * @name pc.Application#autoRender
         * @type Boolean
         * @description When true (the default) the application's render function is called every frame.
         */
        autoRender: boolean;
        /**
         * @name pc.Application#renderNextFrame
         * @type Boolean
         * @description If {@link pc.Application#autoRender} is false, set `app.renderNextFrame` true to force application to render the scene once next frame.
         * @example
         * // render the scene only while space key is pressed
         * if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
         *    this.app.renderNextFrame = true;
         * }
         */
        renderNextFrame: boolean;
        /**
         * @function
         * @name pc.Application#configure
         * @description Load the application configuration file and apply application properties and fill the asset registry
         * @param {String} url The URL of the configuration file to load
         * @param {Function} callback The Function called when the configuration file is loaded and parsed
         */
        configure(url: string, callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.Application#preload
         * @description Load all assets in the asset registry that are marked as 'preload'
         * @param {Function} callback Function called when all assets are loaded
         */
        preload(callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.Application#getSceneUrl
         * @description Look up the URL of the scene hierarchy file via the name given to the scene in the editor. Use this to in {@link pc.Application#loadSceneHierarchy}.
         * @param {String} name The name of the scene file given in the Editor
         * @returns {String} The URL of the scene file
         */
        getSceneUrl(name: string): string;
        /**
         * @function
         * @name pc.Application#loadSceneHierarchy
         * @description Load a scene file, create and initialize the Entity hierarchy
         * and add the hierarchy to the application root Entity.
         * @param {String} url The URL of the scene file. Usually this will be "scene_id.json"
         * @param {Function} callback The function to call after loading, passed (err, entity) where err is null if no errors occurred.
         * @example
         *
         * app.loadSceneHierarchy("1000.json", function (err, entity) {
         *     if (!err) {
         *       var e = app.root.find("My New Entity");
         *     } else {
         *       // error
         *     }
         *   }
         * });
         */
        loadSceneHierarchy(url: string, callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.Application#loadSceneSettings
         * @description Load a scene file and apply the scene settings to the current scene
         * @param {String} url The URL of the scene file. Usually this will be "scene_id.json"
         * @param {Function} callback The function called after the settings are applied. Passed (err) where err is null if no error occurred.
         * @example
         * app.loadSceneSettings("1000.json", function (err) {
         *     if (!err) {
         *       // success
         *     } else {
         *       // error
         *     }
         *   }
         * });
         */
        loadSceneSettings(url: string, callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.Application#start
         * @description Start the Application updating
         */
        start(): void;
        /**
         * @function
         * @name pc.Application#update
         * @description Application specific update method. Override this if you have a custom Application
         * @param {Number} dt The time delta since the last frame.
         */
        update(dt: number): void;
        /**
         * @function
         * @name pc.Application#render
         * @description Application specific render method. Override this if you have a custom Application
         */
        render(): void;
        /**
         * @function
         * @name pc.Application#setCanvasFillMode
         * @description Controls how the canvas fills the window and resizes when the window changes.
         * @param {String} mode The mode to use when setting the size of the canvas. Can be:
         * <ul>
         *     <li>pc.FILLMODE_NONE: the canvas will always match the size provided.</li>
         *     <li>pc.FILLMODE_FILL_WINDOW: the canvas will simply fill the window, changing aspect ratio.</li>
         *     <li>pc.FILLMODE_KEEP_ASPECT: the canvas will grow to fill the window as best it can while maintaining the aspect ratio.</li>
         * </ul>
         * @param {Number} [width] The width of the canvas (only used when mode is pc.FILLMODE_NONE).
         * @param {Number} [height] The height of the canvas (only used when mode is pc.FILLMODE_NONE).
         */
        setCanvasFillMode(mode: string, width?: number, height?: number): void;
        /**
         * @function
         * @name pc.Application#setCanvasResolution
         * @description Change the resolution of the canvas, and set the way it behaves when the window is resized
         * @param {String} mode The mode to use when setting the resolution. Can be:
         * <ul>
         *     <li>pc.RESOLUTION_AUTO: if width and height are not provided, canvas will be resized to match canvas client size.</li>
         *     <li>pc.RESOLUTION_FIXED: resolution of canvas will be fixed.</li>
         * </ul>
         * @param {Number} [width] The horizontal resolution, optional in AUTO mode, if not provided canvas clientWidth is used
         * @param {Number} [height] The vertical resolution, optional in AUTO mode, if not provided canvas clientHeight is used
         */
        setCanvasResolution(mode: string, width?: number, height?: number): void;
        /**
         * @function
         * @name pc.Application#isHidden
         * @description Queries the visibility of the window or tab in which the application is running.
         * @returns {Boolean} True if the application is not visible and false otherwise.
         */
        isHidden(): boolean;
        /**
         * @function
         * @name pc.Application#resizeCanvas
         * @description Resize the canvas in line with the current FillMode
         * In KEEP_ASPECT mode, the canvas will grow to fill the window as best it can while maintaining the aspect ratio
         * In FILL_WINDOW mode, the canvas will simply fill the window, changing aspect ratio
         * In NONE mode, the canvas will always match the size provided
         * @param {Number} [width] The width of the canvas, only used in NONE mode
         * @param {Number} [height] The height of the canvas, only used in NONE mode
         * @returns {Object} A object containing the values calculated to use as width and height
         */
        resizeCanvas(width?: number, height?: number): any;
        /**
         * @function
         * @name pc.Application#setSkybox
         * @description Sets the skybox asset to current scene, and subscribes to asset load/change events
         * @param {pc.Asset} asset Asset of type `skybox` to be set to, or null to remove skybox
         */
        setSkybox(asset: pc.Asset): void;
        /**
         * @function
         * @name pc.Application#destroy
         * @description Destroys application and removes all event listeners.
         */
        destroy(): void;
        /**
         * @function
         * @name pc.Application#renderLine
         * @description Renders a line. Line start and end coordinates are specified in
         * world-space. If a single color is supplied, the line will be flat-shaded with
         * that color. If two colors are supplied, the line will be smooth shaded between
         * those colors. It is also possible to control which scene layer the line is
         * rendered into. By default, lines are rendered into the immediate layer
         * {@link pc.LAYERID_IMMEDIATE}.
         * @param {pc.Vec3} start - The start world-space coordinate of the line.
         * @param {pc.Vec3} end - The end world-space coordinate of the line.
         * @param {pc.Color} color - The start color of the line.
         * @param {pc.Color} [endColor] - The end color of the line.
         * @param {Object} [options] - Options to set rendering properties
         * @param {pc.Layer} [options.layer] - The layer to render the line into. Defaults
         * to {@link pc.LAYERID_IMMEDIATE}.
         * @example
         * // Render a 1-unit long white line
         * var start = new pc.Vec3(0, 0, 0);
         * var end = new pc.Vec3(1, 0, 0);
         * var color = new pc.Color(1, 1, 1);
         * app.renderLine(start, end, color);
         * @example
         * // Render a 1-unit long line that is smooth-shaded from white to red
         * var start = new pc.Vec3(0, 0, 0);
         * var end = new pc.Vec3(1, 0, 0);
         * var startColor = new pc.Color(1, 1, 1);
         * var endColor = new pc.Color(1, 0, 0);
         * app.renderLine(start, end, startColor, endColor);
         * @example
         * // Render a 1-unit long white line into the world layer
         * var start = new pc.Vec3(0, 0, 0);
         * var end = new pc.Vec3(1, 0, 0);
         * var color = new pc.Color(1, 1, 1);
         * var worldLayer = app.scene.layers.getLayerById(pc.LAYERID_WORLD);
         * app.renderLine(start, end, color, {
         *     layer: worldLayer
         * });
         * @example
         * // Render a 1-unit long line that is smooth-shaded from white to red into the world layer
         * var start = new pc.Vec3(0, 0, 0);
         * var end = new pc.Vec3(1, 0, 0);
         * var startColor = new pc.Color(1, 1, 1);
         * var endColor = new pc.Color(1, 0, 0);
         * var worldLayer = app.scene.layers.getLayerById(pc.LAYERID_WORLD);
         * app.renderLine(start, end, color, {
         *     layer: worldLayer
         * });
         */
        renderLine(start: pc.Vec3, end: pc.Vec3, color: pc.Color, endColor?: pc.Color, options?: {
            layer?: pc.Layer;
        }): void;
        /**
         * @function
         * @name pc.Application#renderLines
         * @description Draw an array of lines.
         * @param {pc.Vec3[]} position An array of points to draw lines between
         * @param {pc.Color[]} color An array of colors to color the lines. This must be the same size as the position array
         * @param {Object} [options] Options to set rendering properties
         * @param {pc.Layer} [options.layer] The layer to render the line into
         * @example
         * var points = [new pc.Vec3(0,0,0), new pc.Vec3(1,0,0), new pc.Vec3(1,1,0), new pc.Vec3(1,1,1)];
         * var colors = [new pc.Color(1,0,0), new pc.Color(1,1,0), new pc.Color(0,1,1), new pc.Color(0,0,1)];
         * app.renderLines(points, colors);
         */
        renderLines(position: pc.Vec3[], color: pc.Color[], options?: {
            layer?: pc.Layer;
        }): void;
    }
    /**
     * @enum pc.FILLMODE
     * @name pc.FILLMODE_NONE
     * @description When resizing the window the size of the canvas will not change.
     */
    enum FILLMODE_NONE {
    }
    /**
     * @enum pc.FILLMODE
     * @name pc.FILLMODE_FILL_WINDOW
     * @description When resizing the window the size of the canvas will change to fill the window exactly.
     */
    enum FILLMODE_FILL_WINDOW {
    }
    /**
     * @enum pc.FILLMODE
     * @name pc.FILLMODE_KEEP_ASPECT
     * @description When resizing the window the size of the canvas will change to fill the window as best it can, while maintaining the same aspect ratio.
     */
    enum FILLMODE_KEEP_ASPECT {
    }
    /**
     * @enum pc.RESOLUTION
     * @name pc.RESOLUTION_AUTO
     * @description When the canvas is resized the resolution of the canvas will change to match the size of the canvas.
     */
    enum RESOLUTION_AUTO {
    }
    /**
     * @enum pc.RESOLUTION
     * @name pc.RESOLUTION_FIXED
     * @description When the canvas is resized the resolution of the canvas will remain at the same value and the output will just be scaled to fit the canvas.
     */
    enum RESOLUTION_FIXED {
    }
    /**
     * @component Animation
     * @constructor
     * @name pc.AnimationComponent
     * @classdesc The Animation Component allows an Entity to playback animations on models
     * @description Create a new AnimationComponent
     * @param {pc.AnimationComponentSystem} system The {@link pc.ComponentSystem} that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to
     * @extends pc.Component
     * @property {Number} speed Speed multiplier for animation play back speed. 1.0 is playback at normal speed, 0.0 pauses the animation
     * @property {Boolean} loop If true the animation will restart from the beginning when it reaches the end
     * @property {Boolean} activate If true the first animation asset will begin playing when the scene is loaded
     * @property {pc.Asset[]} assets The array of animation assets - can also be an array of asset ids.
     * @property {Number} currentTime Get or Set the current time position (in seconds) of the animation
     * @property {Number} duration Get the duration in seconds of the current animation.
     */
    class AnimationComponent extends pc.Component {
        constructor(system: pc.AnimationComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.AnimationComponent#play
         * @description Start playing an animation
         * @param {String} name The name of the animation asset to begin playing.
         * @param {Number} [blendTime] The time in seconds to blend from the current
         * animation state to the start of the animation being set.
         */
        play(name: string, blendTime?: number): void;
        /**
         * @function
         * @name pc.AnimationComponent#getAnimation
         * @description Return an animation
         * @param {String} name The name of the animation asset
         * @returns {pc.Animation} An Animation
         */
        getAnimation(name: string): pc.Animation;
    }
    /**
     * @constructor
     * @name pc.AnimationComponentSystem
     * @classdesc The AnimationComponentSystem manages creating and deleting AnimationComponents
     * @description Create an AnimationComponentSystem
     * @param {pc.Application} app The application managing this system.
     * @extends pc.ComponentSystem
     */
    class AnimationComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.AudioListenerComponent
     * @classdesc Represents the audio listener in the 3D world, so that 3D positioned audio sources are heard correctly.
     * @description Create new AudioListenerComponent
     * @param {pc.AudioListenerComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @extends pc.Component
     */
    class AudioListenerComponent extends pc.Component {
        constructor(system: pc.AudioListenerComponentSystem, entity: pc.Entity);
    }
    /**
     * @constructor
     * @name pc.AudioListenerComponentSystem
     * @classdesc Component System for adding and removing {@link pc.AudioComponent} objects to Entities.
     * @description Create a new AudioListenerComponentSystem
     * @param {pc.Application} app The application managing this system.
     * @param {pc.SoundManager} manager A sound manager instance.
     * @extends pc.ComponentSystem
     */
    class AudioListenerComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application, manager: pc.SoundManager);
    }
    /**
     * @component
     * @constructor
     * @name pc.ButtonComponent
     * @extends pc.Component
     * @classdesc A ButtonComponent enables a group of entities to behave like a button, with different visual states for hover and press interactions.
     * @description Create a new ButtonComponent.
     * @param {pc.ButtonComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @property {Boolean} active If set to false, the button will be visible but will not respond to hover or touch interactions.
     * @property {pc.Entity} imageEntity A reference to the entity to be used as the button background. The entity must have an ImageElement component.
     * @property {pc.Vec4} hitPadding Padding to be used in hit-test calculations. Can be used to expand the bounding box so that the button is easier to tap.
     * @property {pc.BUTTON_TRANSITION_MODE} transitionMode Controls how the button responds when the user hovers over it/presses it.
     * @property {pc.Color} hoverTint Color to be used on the button image when the user hovers over it.
     * @property {pc.Color} pressedTint Color to be used on the button image when the user presses it.
     * @property {pc.Color} inactiveTint Color to be used on the button image when the button is not interactive.
     * @property {Number} fadeDuration Duration to be used when fading between tints, in milliseconds.
     * @property {pc.Asset} hoverSpriteAsset Sprite to be used as the button image when the user hovers over it.
     * @property {Number} hoverSpriteFrame Frame to be used from the hover sprite.
     * @property {pc.Asset} pressedSpriteAsset Sprite to be used as the button image when the user presses it.
     * @property {Number} pressedSpriteFrame Frame to be used from the pressed sprite.
     * @property {pc.Asset} inactiveSpriteAsset Sprite to be used as the button image when the button is not interactive.
     * @property {Number} inactiveSpriteFrame Frame to be used from the inactive sprite.
     */
    class ButtonComponent extends pc.Component {
        constructor(system: pc.ButtonComponentSystem, entity: pc.Entity);
    }
    /**
     * @enum pc.BUTTON_TRANSITION_MODE
     * @name pc.BUTTON_TRANSITION_MODE_TINT
     * @description Specifies different color tints for the hover, pressed and inactive states.
     */
    enum BUTTON_TRANSITION_MODE_TINT {
    }
    /**
     * @enum pc.BUTTON_TRANSITION_MODE
     * @name pc.BUTTON_TRANSITION_MODE_SPRITE_CHANGE
     * @description Specifies different sprites for the hover, pressed and inactive states.
     */
    enum BUTTON_TRANSITION_MODE_SPRITE_CHANGE {
    }
    /**
     * @constructor
     * @name pc.ButtonComponentSystem
     * @classdesc Manages creation of {@link pc.ButtonComponent}s.
     * @description Create a new ButtonComponentSystem
     * @param {pc.Application} app The application
     * @extends pc.ComponentSystem
     */
    class ButtonComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.CameraComponent
     * @extends pc.Component
     * @classdesc The Camera Component enables an Entity to render the scene. A scene requires at least one
     * enabled camera component to be rendered. Note that multiple camera components can be enabled
     * simultaneously (for split-screen or offscreen rendering, for example).
     * @description Create a new Camera Component.
     * @param {pc.CameraComponentSystem} system The ComponentSystem that created this Component.
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @example
     * // Add a pc.CameraComponent to an entity
     * var entity = new pc.Entity();
     * entity.addComponent('camera', {
     *     nearClip: 1,
     *     farClip: 100,
     *     fov: 55
     * });
     * @example
     * // Get the pc.CameraComponent on an entity
     * var cameraComponent = entity.camera;
     * @example
     * // Update a property on a camera component
     * entity.camera.nearClip = 2;
     * @property {Number} projection The type of projection used to render the camera. Can be:
     * <ul>
     *     <li>{@link pc.PROJECTION_PERSPECTIVE}: A perspective projection. The camera frustum resembles a truncated pyramid.</li>
     *     <li>{@link pc.PROJECTION_ORTHOGRAPHIC}: An orthographic projection. The camera frustum is a cuboid.</li>
     * </ul>
     * Defaults to pc.PROJECTION_PERSPECTIVE.
     * @property {Number} nearClip The distance from the camera before which no rendering will take place.
     * @property {Number} farClip The distance from the camera after which no rendering will take place.
     * @property {Number} aspectRatioMode The aspect ratio mode of the camera. Can be pc.ASPECT_AUTO (default) or pc.ASPECT_MANUAL. ASPECT_AUTO will always be current render target's width divided by height. ASPECT_MANUAL will use the aspectRatio value instead.
     * @property {Number} aspectRatio The aspect ratio (width divided by height) of the camera. If aspectRatioMode is ASPECT_AUTO, then this value will be automatically calculated every frame, and you can only read it. If it's ASPECT_MANUAL, you can set the value.
     * @property {Boolean} horizontalFov Set which axis to use for the Field of View calculation. Defaults to false (use Y-axis).
     * @property {Number} fov The field of view of the camera in degrees. Usually this is the Y-axis field of
     * view, see {@link pc.CameraComponent#horizontalFov}. Used for {@link pc.PROJECTION_PERSPECTIVE} cameras only. Defaults to 45.
     * @property {Number} orthoHeight The half-height of the orthographic view window (in the Y-axis). Used for
     * {@link pc.PROJECTION_ORTHOGRAPHIC} cameras only. Defaults to 10.
     * @property {Number} priority Controls the order in which cameras are rendered. Cameras with smaller values for priority are rendered first.
     * @property {pc.Color} clearColor The color used to clear the canvas to before the camera starts to render.
     * @property {Boolean} clearColorBuffer If true the camera will clear the color buffer to the color set in clearColor.
     * @property {Boolean} clearDepthBuffer If true the camera will clear the depth buffer.
     * @property {Boolean} clearStencilBuffer If true the camera will clear the stencil buffer.
     * @property {pc.Vec4} rect Controls where on the screen the camera will be rendered in normalized screen coordinates.
     * @property {pc.Vec4} scissorRect Clips all pixels which are not in the rectangle.
     * The order of the values is [x, y, width, height].
     * @property {pc.PostEffectQueue} postEffects The post effects queue for this camera. Use this to add or remove post effects from the camera.
     * @property {Boolean} frustumCulling Controls the culling of mesh instances against the camera frustum, i.e. if objects outside of camera should be omitted from rendering.
     * If true, culling is enabled.
     * If false, all mesh instances in the scene are rendered by the camera, regardless of visibility. Defaults to false.
     * @property {Function} calculateTransform Custom function you can provide to calculate the camera transformation matrix manually. Can be used for complex effects like reflections. Function is called using component's scope.
     * Arguments:
     *     <li>{pc.Mat4} transformMatrix: output of the function</li>
     *     <li>{Number} view: Type of view. Can be pc.VIEW_CENTER, pc.VIEW_LEFT or pc.VIEW_RIGHT. Left and right are only used in stereo rendering.</li>
     * @property {Function} calculateProjection Custom function you can provide to calculate the camera projection matrix manually. Can be used for complex effects like doing oblique projection. Function is called using component's scope.
     * Arguments:
     *     <li>{pc.Mat4} transformMatrix: output of the function</li>
     *     <li>{Number} view: Type of view. Can be pc.VIEW_CENTER, pc.VIEW_LEFT or pc.VIEW_RIGHT. Left and right are only used in stereo rendering.</li>
     * @property {Boolean} cullFaces If true the camera will take material.cull into account. Otherwise both front and back faces will be rendered.
     * @property {Boolean} flipFaces If true the camera will invert front and back faces. Can be useful for reflection rendering.
     * @property {Number[]} layers An array of layer IDs ({@link pc.Layer#id}) to which this camera should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
     */
    class CameraComponent extends pc.Component {
        constructor(system: pc.CameraComponentSystem, entity: pc.Entity);
        /**
         * @readonly
         * @name pc.CameraComponent#projectionMatrix
         * @type pc.Mat4
         * @description Queries the camera's projection matrix.
         */
        readonly projectionMatrix: pc.Mat4;
        /**
         * @readonly
         * @name pc.CameraComponent#viewMatrix
         * @type pc.Mat4
         * @description Queries the camera's view matrix.
         */
        readonly viewMatrix: pc.Mat4;
        /**
         * @readonly
         * @name pc.CameraComponent#frustum
         * @type pc.Frustum
         * @description Queries the camera's frustum shape.
         */
        readonly frustum: pc.Frustum;
        /**
         * @name pc.CameraComponent#vrDisplay
         * @type pc.VrDisplay
         * @description The {@link pc.VrDisplay} that the camera is current displaying to. This is set automatically by calls to {@link pc.CameraComponent#enterVr}
         * or {@link pc.CameraComponent#exitVr}. Setting this property to a display directly enables the camera to use the transformation information
         * from a display without rendering stereo to it, e.g. for "magic window" style experiences.
         * @example
         * // enable magic window style interface
         * var display = this.app.vr.display;
         * if (display) {
         *     this.entity.camera.vrDisplay = display;
         * }
         *
         * var camera = this.entity.camera;
         * camera.enterVr(function (err) {
         * if (err) { return; }
         *     var display = camera.vrDisplay; // access presenting pc.VrDisplay
         * });
         */
        vrDisplay: pc.VrDisplay;
        /**
         * @readonly
         * @name pc.CameraComponent#node
         * @type pc.GraphNode
         * @description Queries the camera's GraphNode. Can be used to get position and rotation.
         */
        readonly node: pc.GraphNode;
        /**
         * @function
         * @name pc.CameraComponent#screenToWorld
         * @description Convert a point from 2D screen space to 3D world space.
         * @param {Number} screenx x coordinate on PlayCanvas' canvas element.
         * @param {Number} screeny y coordinate on PlayCanvas' canvas element.
         * @param {Number} cameraz The distance from the camera in world space to create the new point.
         * @param {pc.Vec3} [worldCoord] 3D vector to receive world coordinate result.
         * @example
         * // Get the start and end points of a 3D ray fired from a screen click position
         * var start = entity.camera.screenToWorld(clickX, clickY, entity.camera.nearClip);
         * var end = entity.camera.screenToWorld(clickX, clickY, entity.camera.farClip);
         *
         * // Use the ray coordinates to perform a raycast
         * app.systems.rigidbody.raycastFirst(start, end, function (result) {
         *     console.log("Entity " + result.entity.name + " was selected");
         * });
         * @returns {pc.Vec3} The world space coordinate.
         */
        screenToWorld(screenx: number, screeny: number, cameraz: number, worldCoord?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.CameraComponent#worldToScreen
         * @description Convert a point from 3D world space to 2D screen space.
         * @param {pc.Vec3} worldCoord The world space coordinate.
         * @param {pc.Vec3} [screenCoord] 3D vector to receive screen coordinate result.
         * @returns {pc.Vec3} The screen space coordinate.
         */
        worldToScreen(worldCoord: pc.Vec3, screenCoord?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.CameraComponent#calculateAspectRatio
         * @description Calculates aspect ratio value for a given render target.
         * @param {pc.RenderTarget} [rt] Optional render target. If unspecified, the backbuffer is assumed.
         * @returns {Number} The aspect ratio of the render target (or backbuffer).
         */
        calculateAspectRatio(rt?: pc.RenderTarget): number;
        /**
         * @function
         * @name pc.CameraComponent#enterVr
         * @variation 1
         * @description Attempt to start presenting this camera to a {@link pc.VrDisplay}.
         * @param {Function} callback Function called once to indicate success of failure. The callback takes one argument (err).
         * On success it returns null on failure it returns the error message.
         * @example
         * // On an entity with a camera component
         * this.entity.camera.enterVr(function (err) {
         *     if (err) {
         *         console.error(err);
         *         return;
         *     } else {
         *         // in VR!
         *     }
         * });
         */
        enterVr(callback: (...params: any[]) => any): void;
        /** @function
         * @name pc.CameraComponent#enterVr
         * @variation 2
         * @description Attempt to start presenting this camera to a {@link pc.VrDisplay}.
         * @param {pc.VrDisplay} display The VrDisplay to present. If not supplied this uses {@link pc.VrManager#display} as the default
         * @param {Function} callback Function called once to indicate success of failure. The callback takes one argument (err).
         * On success it returns null on failure it returns the error message.
         * @example
         * // On an entity with a camera component
         * this.entity.camera.enterVr(function (err) {
         *     if (err) {
         *         console.error(err);
         *         return;
         *     } else {
         *         // in VR!
         *     }
         * });
         */
        enterVr(display: pc.VrDisplay, callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.CameraComponent#exitVr
         * @description Attempt to stop presenting this camera.
         * @param {Function} callback Function called once to indicate success of failure. The callback takes one argument (err).
         * On success it returns null on failure it returns the error message.
         * @example
         * this.entity.camera.exitVr(function (err) {
         *     if (err) {
         *         console.error(err);
         *     } else {
         *
         *     }
         * });
         */
        exitVr(callback: (...params: any[]) => any): void;
    }
    /**
     * @constructor
     * @name pc.PostEffectQueue
     * @classdesc Used to manage multiple post effects for a camera
     * @description Create a new PostEffectQueue
     * @param {pc.Application} app The application
     * @param {pc.CameraComponent} camera The camera component
     */
    class PostEffectQueue {
        constructor(app: pc.Application, camera: pc.CameraComponent);
        /**
         * @function
         * @name pc.PostEffectQueue#addEffect
         * @description Adds a post effect to the queue. If the queue is disabled adding a post effect will
         * automatically enable the queue.
         * @param {pc.PostEffect} effect The post effect to add to the queue.
         */
        addEffect(effect: pc.PostEffect): void;
        /**
         * @function
         * @name pc.PostEffectQueue#removeEffect
         * @description Removes a post effect from the queue. If the queue becomes empty it will be disabled automatically.
         * @param {pc.PostEffect} effect The post effect to remove.
         */
        removeEffect(effect: pc.PostEffect): void;
        /**
         * @function
         * @name pc.PostEffectQueue#destroy
         * @description Removes all the effects from the queue and disables it
         */
        destroy(): void;
        /**
         * @function
         * @name pc.PostEffectQueue#enable
         * @description Enables the queue and all of its effects. If there are no effects then the queue will not be enabled.
         */
        enable(): void;
        /**
         * @function
         * @name pc.PostEffectQueue#disable
         * @description Disables the queue and all of its effects.
         */
        disable(): void;
    }
    /**
     * @constructor
     * @name pc.CameraComponentSystem
     * @classdesc Used to add and remove {@link pc.CameraComponent}s from Entities. It also holds an
     * array of all active cameras.
     * @description Create a new CameraComponentSystem
     * @param {pc.Application} app The Application
     *
     * @property {pc.CameraComponent[]} cameras Holds all the active camera components
     * @extends pc.ComponentSystem
     */
    class CameraComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.CollisionComponent
     * @classdesc A collision volume. Use this in conjunction with a {@link pc.RigidBodyComponent} to make a collision volume that can be simulated using the physics engine.
     * <p>If the {@link pc.Entity} does not have a {@link pc.RigidBodyComponent} then this collision volume will act as a trigger volume. When an entity with a dynamic
     * or kinematic body enters or leaves an entity with a trigger volume, both entities will receive trigger events.
     * <p>The following table shows all the events that can be fired between two Entities:
     * <table class="table table-striped table-condensed">
     *  <tr><td></td><td><strong>Rigid Body (Static)</strong></td><td><strong>Rigid Body (Dynamic or Kinematic)</strong></td><td><strong>Trigger Volume</strong></td></tr>
     *  <tr>
     *       <td><strong>Rigid Body (Static)</strong></td>
     *       <td>-</td>
     *       <td><ul class="list-group">
     *           <li class="list-group-item">contact</li>
     *           <li class="list-group-item">collisionstart</li>
     *           <li class="list-group-item">collisionend</li>
     *       </td>
     *       <td>-</td>
     *   </tr>
     *  <tr>
     *       <td><strong>Rigid Body (Dynamic or Kinematic)</strong></td>
     *       <td><ul class="list-group">
     *           <li class="list-group-item">contact</li>
     *           <li class="list-group-item">collisionstart</li>
     *           <li class="list-group-item">collisionend</li>
     *       </td>
     *       <td><ul class="list-group">
     *           <li class="list-group-item">contact</li>
     *           <li class="list-group-item">collisionstart</li>
     *           <li class="list-group-item">collisionend</li>
     *       </td>
     *       <td><ul class="list-group">
     *           <li class="list-group-item">triggerenter</li>
     *           <li class="list-group-item">triggerleave</li>
     *       </td>
     *   </tr>
     *  <tr>
     *       <td><strong>Trigger Volume</strong></td>
     *       <td>-</td>
     *       <td><ul class="list-group">
     *           <li class="list-group-item">triggerenter</li>
     *           <li class="list-group-item">triggerleave</li>
     *       </td>
     *       <td>-</td>
     *   </tr>
     * </table>
     * </p>
     * @description Create a new CollisionComponent
     * @param {pc.CollisionComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @property {String} type The type of the collision volume. Defaults to 'box'. Can be one of the following:
     * <ul>
     * <li><strong>box</strong>: A box-shaped collision volume.</li>
     * <li><strong>sphere</strong>: A sphere-shaped collision volume.</li>
     * <li><strong>capsule</strong>: A capsule-shaped collision volume.</li>
     * <li><strong>cylinder</strong>: A cylinder-shaped collision volume.</li>
     * <li><strong>mesh</strong>: A collision volume that uses a model asset as its shape.</li>
     * </ul>
     * @property {pc.Vec3} halfExtents The half-extents of the box-shaped collision volume in the x, y and z axes. Defaults to [0.5, 0.5, 0.5]
     * @property {Number} radius The radius of the sphere, capsule or cylinder-shaped collision volumes. Defaults to 0.5
     * @property {Number} axis The local space axis with which the capsule or cylinder-shaped collision volume's length is aligned. 0 for X, 1 for Y and 2 for Z. Defaults to 1 (Y-axis).
     * @property {Number} height The total height of the capsule or cylinder-shaped collision volume from tip to tip. Defaults to 2.
     * @property {pc.Asset} asset The asset for the model of the mesh collision volume - can also be an asset id.
     * @property {pc.Model} model The model that is added to the scene graph for the mesh collision volume.
     * @extends pc.Component
     */
    class CollisionComponent extends pc.Component {
        constructor(system: pc.CollisionComponentSystem, entity: pc.Entity);
    }
    /**
     * @constructor
     * @name pc.CollisionComponentSystem
     * @classdesc Manages creation of {@link pc.CollisionComponent}s.
     * @description Creates a new CollisionComponentSystem.
     * @param {pc.Application} app The running {pc.Application}
     * @extends pc.ComponentSystem
     */
    class CollisionComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @constructor
     * @name pc.Component
     * @classdesc Components are used to attach functionality on a {@link pc.Entity}. Components
     * can receive update events each frame, and expose properties to the PlayCanvas Editor.
     * @description Base constructor for a Component
     * @param {pc.ComponentSystem} system The ComponentSystem used to create this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to
     * @property {Boolean} enabled Enables or disables the component.
     */
    class Component {
        constructor(system: pc.ComponentSystem, entity: pc.Entity);
    }
    /**
     * @enum pc.ELEMENTTYPE
     * @name pc.ELEMENTTYPE_GROUP
     * @description A {@link pc.ElementComponent} that contains child {@link pc.ElementComponent}s.
     */
    enum ELEMENTTYPE_GROUP {
    }
    /**
     * @enum pc.ELEMENTTYPE
     * @name pc.ELEMENTTYPE_IMAGE
     * @description A {@link pc.ElementComponent} that displays an image.
     */
    enum ELEMENTTYPE_IMAGE {
    }
    /**
     * @enum pc.ELEMENTTYPE
     * @name pc.ELEMENTTYPE_TEXT
     * @description A {@link pc.ElementComponent} that displays text.
     */
    enum ELEMENTTYPE_TEXT {
    }
    /**
     * @component
     * @constructor
     * @name pc.ElementComponent
     * @extends pc.Component
     * @classdesc Enables an Entity to be positioned using anchors and screen coordinates under a {@link pc.ScreenComponent} or under other ElementComponents.
     * Depending on its type it can be used to render images, text or just as a layout mechanism to build 2D and 3D user interfaces.
     * If the component is a descendant of a {@link pc.ScreenComponent}, then the Entity's {@link pc.Entity.setLocalPosition} is in the {@link pc.ScreenComponent}'s coordinate system.
     * @param {pc.ElementComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @property {String} type The type of the ElementComponent. Can be one of the following:
     * <ul>
     *     <li>pc.ELEMENTTYPE_GROUP: The component can be used as a layout mechanism to create groups of ElementComponents e.g. panels.</li>
     *     <li>pc.ELEMENTTYPE_IMAGE: The component will render an image</li>
     *     <li>pc.ELEMENTTYPE_TEXT: The component will render text</li>
     * </ul>
     * @property {pc.Entity} screen The Entity with a {@link pc.ScreenComponent} that this component belongs to. This is automatically set when the component is a child of a ScreenComponent.
     * @property {Number} drawOrder The draw order of the component. A higher value means that the component will be rendered on top of other components.
     * @property {pc.Vec4} anchor Specifies where the left, bottom, right and top edges of the component are anchored relative to its parent. Each value
     * ranges from 0 to 1. E.g. a value of [0,0,0,0] means that the element will be anchored to the bottom left of its parent. A value of [1, 1, 1, 1] means
     * it will be anchored to the top right. A split anchor is when the left-right or top-bottom pairs of the anchor are not equal. In that case the component will be resized to cover that entire area. E.g. a value of [0,0,1,1] will make the component resize exactly as its parent.
     * @property {pc.Vec2} pivot The position of the pivot of the component relative to its anchor. Each value ranges from 0 to 1 where [0,0] is the bottom left and [1,1] is the top right.
     * @property {pc.Vec4} margin The distance from the left, bottom, right and top edges of the anchor. For example if we are using a split anchor like [0,0,1,1] and the margin is [0,0,0,0] then the component will be the same width and height as its parent.
     * @property {Number} left The distance from the left edge of the anchor. Can be used in combination with a split anchor to make the component's left edge always be 'left' units away from the left.
     * @property {Number} right The distance from the right edge of the anchor. Can be used in combination with a split anchor to make the component's right edge always be 'right' units away from the right.
     * @property {Number} bottom The distance from the bottom edge of the anchor. Can be used in combination with a split anchor to make the component's top edge always be 'top' units away from the top.
     * @property {Number} top The distance from the top edge of the anchor. Can be used in combination with a split anchor to make the component's bottom edge always be 'bottom' units away from the bottom.
     * @property {Number} width The width of the element as set in the editor. Note that in some cases this may not reflect the true width at which the element is rendered, such as when the element is under the control of a {@link pc.LayoutGroupComponent}. See <code>calculatedWidth</code> in order to ensure you are reading the true width at which the element will be rendered.
     * @property {Number} height The height of the element as set in the editor. Note that in some cases this may not reflect the true height at which the element is rendered, such as when the element is under the control of a {@link pc.LayoutGroupComponent}. See <code>calculatedHeight</code> in order to ensure you are reading the true height at which the element will be rendered.
     * @property {Number} calculatedWidth The width at which the element will be rendered. In most cases this will be the same as <code>width</code>. However, in some cases the engine may calculate a different width for the element, such as when the element is under the control of a {@link pc.LayoutGroupComponent}. In these scenarios, <code>calculatedWidth</code> may be smaller or larger than the width that was set in the editor.
     * @property {Number} calculatedHeight The height at which the element will be rendered. In most cases this will be the same as <code>height</code>. However, in some cases the engine may calculate a different height for the element, such as when the element is under the control of a {@link pc.LayoutGroupComponent}. In these scenarios, <code>calculatedHeight</code> may be smaller or larger than the height that was set in the editor.
     * @property {pc.Vec3[]} screenCorners An array of 4 {@link pc.Vec3}s that represent the bottom left, bottom right, top right and top left corners of the component relative to its parent {@link pc.ScreenComponent}.
     * @property {pc.Vec3[]} worldCorners An array of 4 {@link pc.Vec3}s that represent the bottom left, bottom right, top right and top left corners of the component in world space. Only works for 3D ElementComponents.
     * @property {pc.Vec2[]} canvasCorners An array of 4 {@link pc.Vec2}s that represent the bottom left, bottom right, top right and top left corners of the component in canvas pixels. Only works for screen space ElementComponents.
     * @property {Boolean} useInput If true then the component will receive Mouse or Touch input events.
     * @property {pc.Color} color The color of the image for {@link pc.ELEMENTTYPE_IMAGE} types or the color of the text for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} opacity The opacity of the image for {@link pc.ELEMENTTYPE_IMAGE} types or the text for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {pc.Color} outlineColor The text outline effect color and opacity. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} outlineThickness The width of the text outline effect. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {pc.Color} shadowColor The text shadow effect color and opacity. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {pc.Vec2} shadowOffset The text shadow effect shift amount from original text. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} textWidth The width of the text rendered by the component. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} textHeight The height of the text rendered by the component. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} autoWidth Automatically set the width of the component to be the same as the textWidth. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} autoHeight Automatically set the height of the component to be the same as the textHeight. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} fontAsset The id of the font asset used for rendering the text. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {pc.Font} font The font used for rendering the text. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} fontSize The size of the font. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Boolean} autoFitWidth When true the font size and line height will scale so that the text fits inside the width of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitWidth will be ignored if autoWidth is true.
     * @property {Boolean} autoFitHeight When true the font size and line height will scale so that the text fits inside the height of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitHeight will be ignored if autoHeight is true.
     * @property {Number} minFontSize The minimum size that the font can scale to when autoFitWidth or autoFitHeight are true.
     * @property {Number} maxFontSize The maximum size that the font can scale to when autoFitWidth or autoFitHeight are true.
     * @property {Number} spacing The spacing between the letters of the text. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} lineHeight The height of each line of text. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Boolean} wrapLines Whether to automatically wrap lines based on the element width. Only works for {@link pc.ELEMENTTYPE_TEXT} types, and when autoWidth is set to false.
     * @property {Number} maxLines The maximum number of lines that the Element can wrap to. Any leftover text will be appended to the last line. Set this to null to allow unlimited lines.
     * @property {pc.Vec2} alignment The horizontal and vertical alignment of the text. Values range from 0 to 1 where [0,0] is the bottom left and [1,1] is the top right.  Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {String} text The text to render. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {String} key The localization key to use to get the localized text from {@link pc.Application#i18n}. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} textureAsset The id of the texture asset to render. Only works for {@link pc.ELEMENTTYPE_IMAGE} types.
     * @property {pc.Texture} texture The texture to render. Only works for {@link pc.ELEMENTTYPE_IMAGE} types.
     * @property {Number} spriteAsset The id of the sprite asset to render. Only works for {@link pc.ELEMENTTYPE_IMAGE} types which can render either a texture or a sprite.
     * @property {pc.Sprite} sprite The sprite to render. Only works for {@link pc.ELEMENTTYPE_IMAGE} types which can render either a texture or a sprite.
     * @property {Number} spriteFrame The frame of the sprite to render. Only works for {@link pc.ELEMENTTYPE_IMAGE} types who have a sprite assigned.
     * @property {Number} pixelsPerUnit The number of pixels that map to one PlayCanvas unit. Only works for {@link pc.ELEMENTTYPE_IMAGE} types who have a sliced sprite assigned.
     * @property {Number} materialAsset The id of the material asset to use when rendering an image. Only works for {@link pc.ELEMENTTYPE_IMAGE} types.
     * @property {pc.Material} material The material to use when rendering an image. Only works for {@link pc.ELEMENTTYPE_IMAGE} types.
     * @property {pc.Vec4} rect Specifies which region of the texture to use in order to render an image. Values range from 0 to 1 and indicate u, v, width, height. Only works for {@link pc.ELEMENTTYPE_IMAGE} types.
     * @property {Boolean} rtlReorder Reorder the text for RTL languages using a function registered by <code>app.systems.element.registerUnicodeConverter</code>.
     * @property {Boolean} unicodeConverter Convert unicode characters using a function registered by <code>app.systems.element.registerUnicodeConverter</code>.
     * @property {Number} batchGroupId Assign element to a specific batch group (see {@link pc.BatchGroup}). Default value is -1 (no group).
     * @property {Number[]} layers An array of layer IDs ({@link pc.Layer#id}) to which this element should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
     * @property {Boolean} enableMarkup Flag for enabling markup processing. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} rangeStart Index of the first character to render. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     * @property {Number} rangeEnd Index of the last character to render. Only works for {@link pc.ELEMENTTYPE_TEXT} types.
     */
    class ElementComponent extends pc.Component {
        constructor(system: pc.ElementComponentSystem, entity: pc.Entity);
    }
    /**
     * @component
     * @constructor
     * @name pc.ElementDragHelper
     * @description Create a new ElementDragHelper
     * @classdesc Helper class that makes it easy to create Elements that can be dragged by the mouse or touch.
     * @param {pc.ElementComponent} element The Element that should become draggable.
     * @param {String} [axis] Optional axis to constrain to, either 'x', 'y' or null.
     */
    class ElementDragHelper {
        constructor(element: pc.ElementComponent, axis?: string);
    }
    /**
     * @constructor
     * @name pc.ElementComponentSystem
     * @classdesc Manages creation of {@link pc.ElementComponent}s.
     * @param {pc.Application} app The application
     * @extends pc.ComponentSystem
     */
    class ElementComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.LayoutChildComponent
     * @description Create a new LayoutChildComponent
     * @classdesc A LayoutChildComponent enables the Entity to control the sizing applied to it by its parent {@link pc.LayoutGroupComponent}.
     * @param {pc.LayoutChildComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @extends pc.Component
     * @property {Number} minWidth The minimum width the element should be rendered at.
     * @property {Number} minHeight The minimum height the element should be rendered at.
     * @property {Number} maxWidth The maximum width the element should be rendered at.
     * @property {Number} maxHeight The maximum height the element should be rendered at.
     * @property {Number} fitWidthProportion The amount of additional horizontal space that the element should take up, if necessary to satisfy a Stretch/Shrink fitting calculation. This is specified as a proportion, taking into account the proportion values of other siblings.
     * @property {Number} fitHeightProportion The amount of additional vertical space that the element should take up, if necessary to satisfy a Stretch/Shrink fitting calculation. This is specified as a proportion, taking into account the proportion values of other siblings.
     * @property {Number} excludeFromLayout If set to true, the child will be excluded from all layout calculations.
     */
    class LayoutChildComponent extends pc.Component {
        constructor(system: pc.LayoutChildComponentSystem, entity: pc.Entity);
    }
    /**
     * @constructor
     * @name pc.LayoutChildComponentSystem
     * @description Create a new LayoutChildComponentSystem
     * @classdesc Manages creation of {@link pc.LayoutChildComponent}s.
     * @param {pc.Application} app The application
     * @extends pc.ComponentSystem
     */
    class LayoutChildComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.LayoutGroupComponent
     * @description Create a new LayoutGroupComponent
     * @classdesc A LayoutGroupComponent enables the Entity to position and scale child {@link pc.ElementComponent}s according to configurable layout rules.
     * @param {pc.LayoutGroupComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @extends pc.Component
     * @property {pc.ORIENTATION} orientation Whether the layout should run horizontally or vertically.
     * @property {Boolean} reverseX Reverses the order of children along the x axis.
     * @property {Boolean} reverseY Reverses the order of children along the y axis.
     * @property {pc.Vec2} alignment Specifies the horizontal and vertical alignment of child elements. Values range from 0 to 1 where [0,0] is the bottom left and [1,1] is the top right.
     * @property {pc.Vec4} padding Padding to be applied inside the container before positioning any children. Specified as left, bottom, right and top values.
     * @property {pc.Vec2} spacing Spacing to be applied between each child element.
     * @property {pc.FITTING} widthFitting Fitting logic to be applied when positioning and scaling child elements. Can be one of the following:
     * <ul>
     *     <li>{@link pc.FITTING_NONE}: Child elements will be rendered at their natural size.</li>
     *     <li>
     *         {@link pc.FITTING_STRETCH}: When the natural size of all child elements does not fill the width of the container, children will be stretched to fit. The rules for how each child will be stretched are outlined below:
     *         <ol>
     *            <li>Sum the {@link pc.LayoutChildComponent#fitWidthProportion} values of each child and normalize so that all values sum to 1.</li>
     *            <li>Apply the natural width of each child.</li>
     *            <li>If there is space remaining in the container, distribute it to each child based on the normalized {@link pc.LayoutChildComponent#fitWidthProportion} values, but do not exceed the {@link pc.LayoutChildComponent#maxWidth} of each child.</li>
     *         </ol>
     *     </li>
     *     <li>
     *         {@link pc.FITTING_SHRINK}: When the natural size of all child elements overflows the width of the container, children will be shrunk to fit. The rules for how each child will be stretched are outlined below:
     *         <ol>
     *            <li>Sum the {@link pc.LayoutChildComponent#fitWidthProportion} values of each child and normalize so that all values sum to 1.</li>
     *            <li>Apply the natural width of each child.</li>
     *            <li>If the new total width of all children exceeds the available space of the container, reduce each child's width proportionally based on the normalized {@link pc.LayoutChildComponent#fitWidthProportion} values, but do not exceed the {@link pc.LayoutChildComponent#minWidth} of each child.</li>
     *         </ol>
     *     </li>
     *     <li>{@link pc.FITTING_BOTH}: Applies both STRETCH and SHRINK logic as necessary.</li>
     * </ul>
     * <ul>
     * @property {pc.FITTING} heightFitting Identical to {@link pc.LayoutGroupComponent#widthFitting} but for the Y axis.
     * @property {Boolean} wrap Whether or not to wrap children onto a new row/column when the size of the container is exceeded. Defaults to false, which means that children will be be rendered in a single row (horizontal orientation) or column (vertical orientation).<br><br><em>Note that setting wrap to true makes it impossible for the {@link pc.FITTING_BOTH} fitting mode to operate in any logical manner. For this reason, when wrap is true, a {@link pc.LayoutGroupComponent#widthFitting} or {@link pc.LayoutGroupComponent#heightFitting} mode of {@link pc.FITTING_BOTH} will be coerced to {@link pc.FITTING_STRETCH}.<em>
     */
    class LayoutGroupComponent extends pc.Component {
        constructor(system: pc.LayoutGroupComponentSystem, entity: pc.Entity);
    }
    /**
     * @enum pc.FITTING
     * @name pc.FITTING_NONE
     * @description Disable all fitting logic.
     */
    enum FITTING_NONE {
    }
    /**
     * @enum pc.FITTING
     * @name pc.FITTING_STRETCH
     * @description Stretch child elements to fit the parent container
     */
    enum FITTING_STRETCH {
    }
    /**
     * @enum pc.FITTING
     * @name pc.FITTING_SHRINK
     * @description Shrink child elements to fit the parent container
     */
    enum FITTING_SHRINK {
    }
    /**
     * @enum pc.FITTING
     * @name pc.FITTING_BOTH
     * @description Apply both STRETCH and SHRINK fitting logic where applicable.
     */
    enum FITTING_BOTH {
    }
    /**
     * @constructor
     * @name pc.LayoutGroupComponentSystem
     * @description Create a new LayoutGroupComponentSystem
     * @classdesc Manages creation of {@link pc.LayoutGroupComponent}s.
     * @param {pc.Application} app The application
     * @extends pc.ComponentSystem
     */
    class LayoutGroupComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.LightComponent
     * @classdesc The Light Component enables the Entity to light the scene. There are three types
     * of light: directional, point and spot. Directional lights are global in that they are
     * considered to be infinitely far away and light the entire scene. Point and spot lights
     * are local in that they have a position and a range. A spot light is a specialization of
     * a point light where light is emitted in a cone rather than in all directions. Lights
     * also have the ability to cast shadows to add realism to your scenes.
     * @description Creates a new Light Component.
     * @param {pc.LightComponentSystem} system The ComponentSystem that created this Component.
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @example
     * // Add a pc.LightComponent to an entity
     * var entity = new pc.Entity();
     * entity.addComponent('light', {
     *     type: "point",
     *     color: new pc.Color(1, 0, 0),
     *     range: 10
     * });
     * @example
     * // Get the pc.LightComponent on an entity
     * var lightComponent = entity.light;
     * @example
     * // Update a property on a light component
     * entity.light.range = 20;
     * @property {String} type The type of light. Can be:
     * <ul>
     *     <li>"directional": A light that is infinitely far away and lights the entire scene from one direction.</li>
     *     <li>"point": A light that illuminates in all directions from a point.</li>
     *     <li>"spot": A light that illuminates in all directions from a point and is bounded by a cone.</li>
     * </ul>
     * Defaults to "directional".
     * @property {pc.Color} color The Color of the light. The alpha component of the color is
     * ignored. Defaults to white (1, 1, 1).
     * @property {Number} intensity The brightness of the light. Defaults to 1.
     * @property {Boolean} castShadows If enabled the light will cast shadows. Defaults to false.
     * @property {Number} shadowDistance The distance from the viewpoint beyond which shadows
     * are no longer rendered. Affects directional lights only. Defaults to 40.
     * @property {Number} shadowResolution The size of the texture used for the shadow map.
     * Valid sizes are 64, 128, 256, 512, 1024, 2048. Defaults to 1024.
     * @property {Number} shadowBias The depth bias for tuning the appearance of the shadow
     * mapping generated by this light. Defaults to 0.05.
     * @property {Number} normalOffsetBias Normal offset depth bias. Defaults to 0.
     * @property {Number} range The range of the light. Affects point and spot lights only.
     * Defaults to 10.
     * @property {Number} innerConeAngle The angle at which the spotlight cone starts
     * to fade off. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 40.
     * @property {Number} outerConeAngle The angle at which the spotlight cone has faded
     * to nothing. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 45.
     * @property {Number} falloffMode Controls the rate at which a light attentuates from
     * its position. Can be:
     * <ul>
     * <li>{@link pc.LIGHTFALLOFF_LINEAR}: Linear.</li>
     * <li>{@link pc.LIGHTFALLOFF_INVERSESQUARED}: Inverse squared.</li>
     * </ul>
     * Affects point and spot lights only. Defaults to pc.LIGHTFALLOFF_LINEAR.
     * @property {Number} mask Defines a mask to determine which {@link pc.MeshInstance}s are
     * lit by this light. Defaults to 1.
     * @property {Boolean} affectDynamic If enabled the light will affect non-lightmapped objects
     * @property {Boolean} affectLightmapped If enabled the light will affect lightmapped objects
     * @property {Boolean} bake If enabled the light will be rendered into lightmaps
     * @property {Boolean} bakeDir If enabled and bake=true, the light's direction will contribute to directional lightmaps.
     * Be aware, that directional lightmap is an approximation and can only hold single direction per pixel.
     * Intersecting multiple lights with bakeDir=true may lead to incorrect look of specular/bump-mapping in the area of intersection.
     * The error is not always visible though, and highly scene-dependent.
     * @property {Number} shadowUpdateMode Tells the renderer how often shadows must be updated for this light. Options:
     * <ul>
     * <li>{@link pc.SHADOWUPDATE_NONE}: Don't render shadows.</li>
     * <li>{@link pc.SHADOWUPDATE_THISFRAME}: Render shadows only once (then automatically switches to pc.SHADOWUPDATE_NONE).</li>
     * <li>{@link pc.SHADOWUPDATE_REALTIME}: Render shadows every frame (default).</li>
     * </ul>
     * @property {Number} shadowType Type of shadows being rendered by this light. Options:
     * <ul>
     * <li>{@link pc.SHADOW_PCF3}: Render depth (color-packed on WebGL 1.0), can be used for PCF 3x3 sampling.</li>
     * <li>{@link pc.SHADOW_VSM8}: Render packed variance shadow map. All shadow receivers must also cast shadows for this mode to work correctly.</li>
     * <li>{@link pc.SHADOW_VSM16}: Render 16-bit exponential variance shadow map. Requires OES_texture_half_float extension. Falls back to pc.SHADOW_VSM8, if not supported.</li>
     * <li>{@link pc.SHADOW_VSM32}: Render 32-bit exponential variance shadow map. Requires OES_texture_float extension. Falls back to pc.SHADOW_VSM16, if not supported.</li>
     * <li>{@link pc.SHADOW_PCF5}: Render depth buffer only, can be used for hardware-accelerated PCF 5x5 sampling. Requires WebGL2. Falls back to pc.SHADOW_PCF3 on WebGL 1.0.</li>
     * </ul>
     * @property {Number} vsmBlurMode Blurring mode for variance shadow maps:
     * <ul>
     * <li>{@link pc.BLUR_BOX}: Box filter.</li>
     * <li>{@link pc.BLUR_GAUSSIAN}: Gaussian filter. May look smoother than box, but requires more samples.</li>
     * </ul>
     * @property {Number} vsmBlurSize Number of samples used for blurring a variance shadow map. Only uneven numbers work, even are incremented. Minimum value is 1, maximum is 25.
     * @property {Number} cookieAsset Asset that has texture that will be assigned to cookie internally once asset resource is available.
     * @property {pc.Texture} cookie Projection texture. Must be 2D for spot and cubemap for point (ignored if incorrect type is used).
     * @property {Number} cookieIntensity Projection texture intensity (default is 1).
     * @property {Boolean} cookieFalloff Toggle normal spotlight falloff when projection texture is used. When set to false, spotlight will work like a pure texture projector (only fading with distance). Default is false.
     * @property {String} cookieChannel Color channels of the projection texture to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     * @property {Number} cookieAngle Angle for spotlight cookie rotation.
     * @property {pc.Vec2} cookieScale Spotlight cookie scale.
     * @property {pc.Vec2} cookieOffset Spotlight cookie position offset.
     * @property {Boolean} isStatic Mark light as non-movable (optimization)
     * @property {Number[]} layers An array of layer IDs ({@link pc.Layer#id}) to which this light should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
     * @extends pc.Component
     */
    class LightComponent extends pc.Component {
        constructor(system: pc.LightComponentSystem, entity: pc.Entity);
    }
    /**
     * @constructor
     * @name pc.LightComponentSystem
     * @classdesc A Light Component is used to dynamically light the scene.
     * @description Create a new LightComponentSystem.
     * @param {pc.Application} app The application.
     * @extends pc.ComponentSystem
     */
    class LightComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.ModelComponent
     * @classdesc Enables an Entity to render a model or a primitive shape. This Component attaches additional model
     * geometry in to the scene graph below the Entity.
     * @description Create a new ModelComponent
     * @param {pc.ModelComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @extends pc.Component
     * @property {String} type The type of the model, which can be one of the following values:
     * <ul>
     *     <li>asset: The component will render a model asset</li>
     *     <li>box: The component will render a box (1 unit in each dimension)</li>
     *     <li>capsule: The component will render a capsule (radius 0.5, height 2)</li>
     *     <li>cone: The component will render a cone (radius 0.5, height 1)</li>
     *     <li>cylinder: The component will render a cylinder (radius 0.5, height 1)</li>
     *     <li>plane: The component will render a plane (1 unit in each dimension)</li>
     *     <li>sphere: The component will render a sphere (radius 0.5)</li>
     * </ul>
     * @property {pc.Asset} asset The asset for the model (only applies to models of type 'asset') - can also be an asset id.
     * @property {Boolean} castShadows If true, this model will cast shadows for lights that have shadow casting enabled.
     * @property {Boolean} receiveShadows If true, shadows will be cast on this model
     * @property {Number} materialAsset The material {@link pc.Asset} that will be used to render the model (not used on models of type 'asset')
     * @property {pc.Model} model The model that is added to the scene graph. It can be not set or loaded, so will return null.
     * @property {Object} mapping A dictionary that holds material overrides for each mesh instance. Only applies to model components of type 'asset'. The mapping contains pairs of mesh instance index - material asset id.
     * @property {Boolean} castShadowsLightmap If true, this model will cast shadows when rendering lightmaps
     * @property {Boolean} lightmapped If true, this model will be lightmapped after using lightmapper.bake()
     * @property {Number} lightmapSizeMultiplier Lightmap resolution multiplier
     * @property {Boolean} isStatic Mark model as non-movable (optimization)
     * @property {pc.MeshInstance[]} meshInstances An array of meshInstances contained in the component's model. If model is not set or loaded for component it will return null.
     * @property {Number} batchGroupId Assign model to a specific batch group (see {@link pc.BatchGroup}). Default value is -1 (no group).
     * @property {Number[]} layers An array of layer IDs ({@link pc.Layer#id}) to which this model should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
     */
    class ModelComponent extends pc.Component {
        constructor(system: pc.ModelComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.ModelComponent#hide
         * @description Stop rendering model without removing it from the scene hierarchy.
         * This method sets the {@link pc.MeshInstance#visible} property of every MeshInstance in the model to false
         * Note, this does not remove the model or mesh instances from the scene hierarchy or draw call list.
         * So the model component still incurs some CPU overhead.
         * @example
         *   this.timer = 0;
         *   this.visible = true;
         *   // ...
         *   // blink model every 0.1 seconds
         *   this.timer += dt;
         *   if (this.timer > 0.1) {
         *       if (!this.visible) {
         *           this.entity.model.show();
         *           this.visible = true;
         *       } else {
         *           this.entity.model.hide();
         *           this.visible = false;
         *       }
         *       this.timer = 0;
         *   }
         */
        hide(): void;
        /**
         * @function
         * @name pc.ModelComponent#show
         * @description Enable rendering of the model if hidden using {@link pc.ModelComponent#hide}.
         * This method sets all the {@link pc.MeshInstance#visible} property on all mesh instances to true.
         */
        show(): void;
    }
    /**
     * @constructor
     * @name pc.ModelComponentSystem
     * @classdesc Allows an Entity to render a model or a primitive shape like a box,
     * capsule, sphere, cylinder, cone etc.
     * @description Create a new ModelComponentSystem
     * @param {pc.Application} app The Application.
     * @extends pc.ComponentSystem
     */
    class ModelComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.ParticleSystemComponent
     * @classdesc Used to simulate particles and produce renderable particle mesh on either CPU or GPU.
     * GPU simulation is generally much faster than its CPU counterpart, because it avoids slow CPU-GPU synchronization and takes advantage of many GPU cores.
     * However, it requires client to support reasonable uniform count, reading from multiple textures in vertex shader and OES_texture_float extension, including rendering into float textures.
     * Most mobile devices fail to satisfy these requirements, so it's not recommended to simulate thousands of particles on them. GPU version also can't sort particles, so enabling sorting forces CPU mode too.
     * Particle rotation is specified by a single angle parameter: default billboard particles rotate around camera facing axis, while mesh particles rotate around 2 different view-independent axes.
     * Most of the simulation parameters are specified with pc.Curve or pc.CurveSet. Curves are interpolated based on each particle's lifetime, therefore parameters are able to change over time.
     * Most of the curve parameters can also be specified by 2 minimum/maximum curves, this way each particle will pick a random value in-between.
     * @description Create a new ParticleSystemComponent
     * @param {pc.ParticleSystemComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity this Component is attached to
     * @extends pc.Component
     * @property {Boolean} autoPlay Controls whether the particle system plays automatically on creation. If set to false, it is necessary to call {@link pc.ParticleSystemComponent#play} for the particle system to play. Defaults to true.
     * @property {Boolean} loop Enables or disables respawning of particles.
     * @property {Boolean} preWarm If enabled, the particle system will be initialized as though it had already completed a full cycle. This only works with looping particle systems.
     * @property {Boolean} lighting If enabled, particles will be lit by ambient and directional lights.
     * @property {Boolean} halfLambert Enabling Half Lambert lighting avoids particles looking too flat in shadowed areas. It is a completely non-physical lighting model but can give more pleasing visual results.
     * @property {Boolean} alignToMotion Orient particles in their direction of motion.
     * @property {Boolean} depthWrite If enabled, the particles will write to the depth buffer. If disabled, the depth buffer is left unchanged and particles will be guaranteed to overwrite one another in the order in which they are rendered.
     * @property {Boolean} noFog Disable fogging
     * @property {Boolean} localSpace Binds particles to emitter transformation rather then world space.
     * @property {Number} numParticles Maximum number of simulated particles.
     * @property {Number} rate Minimal interval in seconds between particle births.
     * @property {Number} rate2 Maximal interval in seconds between particle births.
     * @property {Number} startAngle Minimal initial Euler angle of a particle.
     * @property {Number} startAngle2 Maximal initial Euler angle of a particle.
     * @property {Number} lifetime The length of time in seconds between a particle's birth and its death.
     * @property {Number} stretch A value in world units that controls the amount by which particles are stretched based on their velocity. Particles are stretched from their center towards their previous position.
     * @property {Number} intensity Color multiplier.
     * @property {Boolean} animLoop Controls whether the sprite sheet animation plays once or loops continuously.
     * @property {Number} animTilesX Number of horizontal tiles in the sprite sheet.
     * @property {Number} animTilesY Number of vertical tiles in the sprite sheet.
     * @property {Number} animNumFrames Number of sprite sheet frames to play. It is valid to set the number of frames to a value less than animTilesX multiplied by animTilesY.
     * @property {Number} animSpeed Sprite sheet animation speed. 1 = particle lifetime, 2 = twice during lifetime etc...
     * @property {Number} depthSoftening Controls fading of particles near their intersections with scene geometry. This effect, when it's non-zero, requires scene depth map to be rendered. Multiple depth-dependent effects can share the same map, but if you only use it for particles, bear in mind that it can double engine draw calls.
     * @property {Number} initialVelocity Defines magnitude of the initial emitter velocity. Direction is given by emitter shape.
     * @property {pc.Vec3} emitterExtents (Only for EMITTERSHAPE_BOX) The extents of a local space bounding box within which particles are spawned at random positions.
     * @property {pc.Vec3} emitterExtentsInner (Only for EMITTERSHAPE_BOX) The exception of extents of a local space bounding box within which particles are not spawned. Aligned to the center of EmitterExtents.
     * @property {Number} emitterRadius (Only for EMITTERSHAPE_SPHERE) The radius within which particles are spawned at random positions.
     * @property {Number} emitterRadiusInner (Only for EMITTERSHAPE_SPHERE) The inner radius within which particles are not spawned.
     * @property {pc.Vec3} wrapBounds The half extents of a world space box volume centered on the owner entity's position. If a particle crosses the boundary of one side of the volume, it teleports to the opposite side.
     * @property {pc.Asset} colorMapAsset The {@link pc.Asset} used to set the colorMap.
     * @property {pc.Asset} normalMapAsset The {@link pc.Asset} used to set the normalMap.
     * @property {pc.Asset} meshAsset The {@link pc.Asset} used to set the mesh.
     * @property {pc.Texture} colorMap The color map texture to apply to all particles in the system. If no texture is assigned, a default spot texture is used.
     * @property {pc.Texture} normalMap The normal map texture to apply to all particles in the system. If no texture is assigned, an approximate spherical normal is calculated for each vertex.
     * @property {pc.EMITTERSHAPE} emitterShape Shape of the emitter. Defines the bounds inside which particles are spawned. Also affects the direction of initial velocity.
     * <ul>
     * <li><strong>{@link pc.EMITTERSHAPE_BOX}</strong>: Box shape parameterized by emitterExtents. Initial velocity is directed towards local Z axis.</li>
     * <li><strong>{@link pc.EMITTERSHAPE_SPHERE}</strong>: Sphere shape parameterized by emitterRadius. Initial velocity is directed outwards from the center.</li>
     * </ul>
     * @property {pc.PARTICLESORT} sort Sorting mode. Forces CPU simulation, so be careful.
     * <ul>
     * <li><strong>{@link pc.PARTICLESORT_NONE}</strong>: No sorting, particles are drawn in arbitary order. Can be simulated on GPU.</li>
     * <li><strong>{@link pc.PARTICLESORT_DISTANCE}</strong>: Sorting based on distance to the camera. CPU only.</li>
     * <li><strong>{@link pc.PARTICLESORT_NEWER_FIRST}</strong>: Newer particles are drawn first. CPU only.</li>
     * <li><strong>{@link pc.PARTICLESORT_OLDER_FIRST}</strong>: Older particles are drawn first. CPU only.</li>
     * </ul>
     * @property {pc.Mesh} mesh Triangular mesh to be used as a particle. Only first vertex/index buffer is used. Vertex buffer must contain local position at first 3 floats of each vertex.
     * @property {pc.BLEND} blend Blending mode.
     * @property {pc.PARTICLEORIENTATION} orientation Sorting mode. Forces CPU simulation, so be careful.
     * <ul>
     * <li><strong>{@link pc.PARTICLEORIENTATION_SCREEN}</strong>: Particles are facing camera.</li>
     * <li><strong>{@link pc.PARTICLEORIENTATION_WORLD}</strong>: User defines world space normal (particleNormal) to set planes orientation.</li>
     * <li><strong>{@link pc.PARTICLEORIENTATION_EMITTER}</strong>: Similar to previous, but the normal is affected by emitter(entity) transformation.</li>
     * </ul>
     * @property {pc.Vec3} particleNormal (Only for PARTICLEORIENTATION_WORLD and PARTICLEORIENTATION_EMITTER) The exception of extents of a local space bounding box within which particles are not spawned. Aligned to the center of EmitterExtents.
     * @property {pc.CurveSet} localVelocityGraph Velocity relative to emitter over lifetime.
     * @property {pc.CurveSet} localVelocityGraph2 If not null, particles pick random values between localVelocityGraph and localVelocityGraph2.
     * @property {pc.CurveSet} velocityGraph World-space velocity over lifetime.
     * @property {pc.CurveSet} velocityGraph2 If not null, particles pick random values between velocityGraph and velocityGraph2.
     * @property {pc.CurveSet} colorGraph Color over lifetime.
     * @property {pc.Curve} rotationSpeedGraph Rotation speed over lifetime.
     * @property {pc.Curve} rotationSpeedGraph2 If not null, particles pick random values between rotationSpeedGraph and rotationSpeedGraph2.
     * @property {pc.Curve} radialSpeedGraph Radial speed over lifetime, velocity vector points from emitter origin to particle pos.
     * @property {pc.Curve} radialSpeedGraph2 If not null, particles pick random values between radialSpeedGraph and radialSpeedGraph2.
     * @property {pc.Curve} scaleGraph Scale over lifetime.
     * @property {pc.Curve} scaleGraph2 If not null, particles pick random values between scaleGraph and scaleGraph2.
     * @property {pc.Curve} alphaGraph Alpha over lifetime.
     * @property {pc.Curve} alphaGraph2 If not null, particles pick random values between alphaGraph and alphaGraph2.
     * @property {Number[]} layers An array of layer IDs ({@link pc.Layer#id}) to which this particle system should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
     */
    class ParticleSystemComponent extends pc.Component {
        constructor(system: pc.ParticleSystemComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.ParticleSystemComponent#reset
         * @description Resets particle state, doesn't affect playing.
         */
        reset(): void;
        /**
         * @function
         * @name pc.ParticleSystemComponent#stop
         * @description Disables the emission of new particles, lets existing to finish their simulation.
         */
        stop(): void;
        /**
         * @function
         * @name pc.ParticleSystemComponent#pause
         * @description Freezes the simulation.
         */
        pause(): void;
        /**
         * @function
         * @name pc.ParticleSystemComponent#unpause
         * @description Unfreezes the simulation.
         */
        unpause(): void;
        /**
         * @function
         * @name pc.ParticleSystemComponent#play
         * @description Enables/unfreezes the simulation.
         */
        play(): void;
        /**
         * @function
         * @name pc.ParticleSystemComponent#isPlaying
         * @description Checks if simulation is in progress.
         * @returns {Boolean} true if the particle system is currently playing and false otherwise.
         */
        isPlaying(): boolean;
    }
    /**
     * @constructor
     * @name pc.ParticleSystemComponentSystem
     * @classdesc Allows an Entity to render a particle system
     * @description Create a new ParticleSystemComponentSystem
     * @param {pc.Application} app The Application.
     * @extends pc.ComponentSystem
     */
    class ParticleSystemComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @constructor
     * @name pc.ComponentSystemRegistry
     * @classdesc Store, access and delete instances of the various ComponentSystems
     * @description Create a new ComponentSystemRegistry
     */
    class ComponentSystemRegistry {
    }
    /**
     * @component
     * @constructor
     * @name pc.RigidBodyComponent
     * @classdesc The rigidbody component, when combined with a {@link pc.CollisionComponent}, allows your
     * entities to be simulated using realistic physics.
     * A rigidbody component will fall under gravity and collide with other rigid bodies. Using scripts, you
     * can apply forces and impulses to rigid bodies.
     * @description Create a new RigidBodyComponent
     * @param {pc.RigidBodyComponentSystem} system The ComponentSystem that created this component
     * @param {pc.Entity} entity The entity this component is attached to
     * @extends pc.Component
     * @property {Number} mass The mass of the body. This is only relevant for {@link pc.BODYTYPE_DYNAMIC}
     * bodies, other types have infinite mass. Defaults to 1.
     * @property {pc.Vec3} linearVelocity Defines the speed of the body in a given direction.
     * @property {pc.Vec3} angularVelocity Defines the rotational speed of the body around each world axis.
     * @property {Number} linearDamping Controls the rate at which a body loses linear velocity over time.
     * Defaults to 0.
     * @property {Number} angularDamping Controls the rate at which a body loses angular velocity over time.
     * Defaults to 0.
     * @property {pc.Vec3} linearFactor Scaling factor for linear movement of the body in each axis.
     * Defaults to 1 in all axes.
     * @property {pc.Vec3} angularFactor Scaling factor for angular movement of the body in each axis.
     * Defaults to 1 in all axes.
     * @property {Number} friction The friction value used when contacts occur between two bodies. A higher
     * value indicates more friction. Should be set in the range 0 to 1. Defaults to 0.5.
     * @property {Number} restitution Influences the amount of energy lost when two rigid bodies collide. The
     * calculation multiplies the restitution values for both colliding bodies. A multiplied value of 0 means
     * that all energy is lost in the collision while a value of 1 means that no energy is lost. Should be
     * set in the range 0 to 1. Defaults to 0.
     * @property {Number} group The collision group this body belongs to. Combine the group and the mask to
     * prevent bodies colliding with each other. Defaults to 1.
     * @property {Number} mask The collision mask sets which groups this body collides with. It is a bitfield
     * of 16 bits, the first 8 bits are reserved for engine use. Defaults to 65535.
     * @property {String} type The rigid body type determines how the body is simulated. Can be:
     * <ul>
     *     <li>pc.BODYTYPE_STATIC: infinite mass and cannot move.</li>
     *     <li>pc.BODYTYPE_DYNAMIC: simulated according to applied forces.</li>
     *     <li>pc.BODYTYPE_KINEMATIC: infinite mass and does not respond to forces but can still be moved by setting their velocity or position.</li>
     * </ul>
     * Defaults to pc.BODYTYPE_STATIC.
     */
    class RigidBodyComponent extends pc.Component {
        constructor(system: pc.RigidBodyComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.RigidBodyComponent#isActive
         * @description Returns true if the rigid body is currently actively being simulated. i.e. not 'sleeping'
         * @returns {Boolean} True if the body is active
         */
        isActive(): boolean;
        /**
         * @function
         * @name pc.RigidBodyComponent#activate
         * @description Forcibly activate the rigid body simulation
         */
        activate(): void;
        /**
         * @function
         * @name pc.RigidBodyComponent#applyForce
         * @description Apply an force to the body at a point. By default, the force is applied at the origin of the
         * body. However, the force can be applied at an offset this point by specifying a world space vector from
         * the body's origin to the point of application. This function has two valid signatures. You can either
         * specify the force (and optional relative point) via 3D-vector or numbers.
         * @param {pc.Vec3|Number} x - A 3-dimensional vector representing the force in world-space or
         * the x-component of the force in world-space.
         * @param {pc.Vec3|Number} [y] - An optional 3-dimensional vector representing the relative point at
         * which to apply the impulse in world-space or the y-component of the force in world-space.
         * @param {Number} [z] - The z-component of the force in world-space.
         * @param {Number} [px] - The x-component of a world-space offset from the body's position where the force is applied.
         * @param {Number} [py] - The y-component of a world-space offset from the body's position where the force is applied.
         * @param {Number} [pz] - The z-component of a world-space offset from the body's position where the force is applied.
         * @example
         * // Apply an approximation of gravity at the body's center
         * this.entity.rigidbody.applyForce(0, -10, 0);
         * @example
         * // Apply an approximation of gravity at 1 unit down the world Z from the center of the body
         * this.entity.rigidbody.applyForce(0, -10, 0, 0, 0, 1);
         * @example
         * // Apply a force at the body's center
         * // Calculate a force vector pointing in the world space direction of the entity
         * var force = this.entity.forward.clone().scale(100);
         *
         * // Apply the force
         * this.entity.rigidbody.applyForce(force);
         * @example
         * // Apply a force at some relative offset from the body's center
         * // Calculate a force vector pointing in the world space direction of the entity
         * var force = this.entity.forward.clone().scale(100);
         *
         * // Calculate the world space relative offset
         * var relativePos = new pc.Vec3();
         * var childEntity = this.entity.findByName('Engine');
         * relativePos.sub2(childEntity.getPosition(), this.entity.getPosition());
         *
         * // Apply the force
         * this.entity.rigidbody.applyForce(force, relativePos);
         */
        applyForce(x: pc.Vec3 | number, y?: pc.Vec3 | number, z?: number, px?: number, py?: number, pz?: number): void;
        /**
         * @function
         * @name pc.RigidBodyComponent#applyTorque
         * @description Apply torque (rotational force) to the body. This function has two valid signatures.
         * You can either specify the torque force with a 3D-vector or with 3 numbers.
         * @param {pc.Vec3|Number} x - A 3-dimensional vector representing the torque force in world-space or
         * the x-component of the torque force in world-space.
         * @param {Number} [y] - The y-component of the torque force in world-space.
         * @param {Number} [z] - The z-component of the torque force in world-space.
         * @example
         * // Apply via vector
         * var torque = new pc.Vec3(0, 10, 0);
         * entity.rigidbody.applyTorque(torque);
         * @example
         * // Apply via numbers
         * entity.rigidbody.applyTorque(0, 10, 0);
         */
        applyTorque(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.RigidBodyComponent#applyImpulse
         * @description Apply an impulse (instantaneous change of velocity) to the body at a point.
         * This function has two valid signatures. You can either specify the impulse (and optional relative
         * point) via 3D-vector or numbers.
         * @param {pc.Vec3|Number} x - A 3-dimensional vector representing the impulse in world-space or
         * the x-component of the impulse in world-space.
         * @param {pc.Vec3|Number} [y] - An optional 3-dimensional vector representing the relative point at
         * which to apply the impulse in the local-space of the entity or the y-component of the impulse to
         * apply in world-space.
         * @param {Number} [z] - The z-component of the impulse to apply in world-space.
         * @param {Number} [px=0] - The x-component of the point at which to apply the impulse in the local-space of the entity.
         * @param {Number} [py=0] - The y-component of the point at which to apply the impulse in the local-space of the entity.
         * @param {Number} [pz=0] - The z-component of the point at which to apply the impulse in the local-space of the entity.
         * @example
         * // Apply an impulse along the world-space positive y-axis at the entity's position.
         * var impulse = new pc.Vec3(0, 10, 0);
         * entity.rigidbody.applyImpulse(impulse);
         * @example
         * // Apply an impulse along the world-space positive y-axis at 1 unit down the positive
         * // z-axis of the entity's local-space.
         * var impulse = new pc.Vec3(0, 10, 0);
         * var relativePoint = new pc.Vec3(0, 0, 1);
         * entity.rigidbody.applyImpulse(impulse, relativePoint);
         * @example
         * // Apply an impulse along the world-space positive y-axis at the entity's position.
         * entity.rigidbody.applyImpulse(0, 10, 0);
         * @example
         * // Apply an impulse along the world-space positive y-axis at 1 unit down the positive
         * // z-axis of the entity's local-space.
         * entity.rigidbody.applyImpulse(0, 10, 0, 0, 0, 1);
         */
        applyImpulse(x: pc.Vec3 | number, y?: pc.Vec3 | number, z?: number, px?: number, py?: number, pz?: number): void;
        /**
         * @function
         * @name pc.RigidBodyComponent#applyTorqueImpulse
         * @description Apply a torque impulse (rotational force applied instantaneously) to the body.
         * This function has two valid signatures. You can either specify the torque force with a 3D-vector
         * or with 3 numbers.
         * @param {pc.Vec3|Number} x - A 3-dimensional vector representing the torque impulse in world-space or
         * the x-component of the torque impulse in world-space.
         * @param {Number} [y] - The y-component of the torque impulse in world-space.
         * @param {Number} [z] - The z-component of the torque impulse in world-space.
         * @example
         * // Apply via vector
         * var torque = new pc.Vec3(0, 10, 0);
         * entity.rigidbody.applyTorqueImpulse(torque);
         * @example
         * // Apply via numbers
         * entity.rigidbody.applyTorqueImpulse(0, 10, 0);
         */
        applyTorqueImpulse(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.RigidBodyComponent#isStatic
         * @description Returns true if the rigid body is of type {@link pc.BODYTYPE_STATIC}
         * @returns {Boolean} True if static
         */
        isStatic(): boolean;
        /**
         * @function
         * @name pc.RigidBodyComponent#isStaticOrKinematic
         * @description Returns true if the rigid body is of type {@link pc.BODYTYPE_STATIC} or {@link pc.BODYTYPE_KINEMATIC}
         * @returns {Boolean} True if static or kinematic
         */
        isStaticOrKinematic(): boolean;
        /**
         * @function
         * @name pc.RigidBodyComponent#isKinematic
         * @description Returns true if the rigid body is of type {@link pc.BODYTYPE_KINEMATIC}
         * @returns {Boolean} True if kinematic
         */
        isKinematic(): boolean;
        /**
         * @function
         * @name pc.RigidBodyComponent#teleport
         * @description Teleport an entity to a new world-space position, optionally setting orientation. This function
         * should only be called for rigid bodies that are dynamic. This function has three valid signatures.
         * The first takes a 3-dimensional vector for the position and an optional 3-dimensional vector for Euler rotation.
         * The second takes a 3-dimensional vector for the position and an optional quaternion for rotation.
         * The third takes 3 numbers for the position and an optional 3 numbers for Euler rotation.
         * @param {pc.Vec3|Number} x - A 3-dimensional vector holding the new position or the new position x-coordinate.
         * @param {pc.Vec3|pc.Quat|Number} y - A 3-dimensional vector or quaternion holding the new rotation or the new
         * position y-coordinate.
         * @param {Number} [z] - The new position z-coordinate.
         * @param {Number} [rx] - The new Euler x-angle value.
         * @param {Number} [ry] - The new Euler y-angle value.
         * @param {Number} [rz] - The new Euler z-angle value.
         * @example
         * // Teleport the entity to the origin
         * entity.rigidbody.teleport(pc.Vec3.ZERO);
         * @example
         * // Teleport the entity to the origin
         * entity.rigidbody.teleport(0, 0, 0);
         * @example
         * // Teleport the entity to world-space coordinate [1, 2, 3] and reset orientation
         * var position = new pc.Vec3(1, 2, 3);
         * entity.rigidbody.teleport(position, pc.Vec3.ZERO);
         * @example
         * // Teleport the entity to world-space coordinate [1, 2, 3] and reset orientation
         * entity.rigidbody.teleport(1, 2, 3, 0, 0, 0);
         */
        teleport(x: pc.Vec3 | number, y: pc.Vec3 | pc.Quat | number, z?: number, rx?: number, ry?: number, rz?: number): void;
    }
    /**
     * @constructor
     * @name pc.RaycastResult
     * @classdesc Object holding the result of a successful raycast hit
     * @description Create a new RaycastResult
     * @param {pc.Entity} entity The entity that was hit
     * @param {pc.Vec3} point The point at which the ray hit the entity in world space
     * @param {pc.Vec3} normal The normal vector of the surface where the ray hit in world space.
     * @property {pc.Entity} entity The entity that was hit
     * @property {pc.Vec3} point The point at which the ray hit the entity in world space
     * @property {pc.Vec3} normal The normal vector of the surface where the ray hit in world space.
     */
    class RaycastResult {
        constructor(entity: pc.Entity, point: pc.Vec3, normal: pc.Vec3);
    }
    /**
     * @constructor
     * @name pc.SingleContactResult
     * @classdesc Object holding the result of a contact between two rigid bodies
     * @description Create a new SingleContactResult
     * @param {pc.Entity} a The first entity involved in the contact
     * @param {pc.Entity} b The second entity involved in the contact
     * @param {pc.ContactPoint} contactPoint The contact point between the two entities
     * @property {pc.Entity} a The first entity involved in the contact
     * @property {pc.Entity} b The second entity involved in the contact
     * @property {pc.Vec3} localPointA The point on Entity A where the contact occurred, relative to A
     * @property {pc.Vec3} localPointB The point on Entity B where the contact occurred, relative to B
     * @property {pc.Vec3} pointA The point on Entity A where the contact occurred, in world space
     * @property {pc.Vec3} pointB The point on Entity B where the contact occurred, in world space
     * @property {pc.Vec3} normal The normal vector of the contact on Entity B, in world space
     */
    class SingleContactResult {
        constructor(a: pc.Entity, b: pc.Entity, contactPoint: pc.ContactPoint);
    }
    /**
     * @constructor
     * @name pc.ContactPoint
     * @classdesc Object holding the result of a contact between two Entities.
     * @description Create a new ContactPoint
     * @param {pc.Vec3} localPoint The point on the entity where the contact occurred, relative to the entity
     * @param {pc.Vec3} localPointOther The point on the other entity where the contact occurred, relative to the other entity
     * @param {pc.Vec3} point The point on the entity where the contact occurred, in world space
     * @param {pc.Vec3} pointOther The point on the other entity where the contact occurred, in world space
     * @param {pc.Vec3} normal The normal vector of the contact on the other entity, in world space
     * @property {pc.Vec3} localPoint The point on the entity where the contact occurred, relative to the entity
     * @property {pc.Vec3} localPointOther The point on the other entity where the contact occurred, relative to the other entity
     * @property {pc.Vec3} point The point on the entity where the contact occurred, in world space
     * @property {pc.Vec3} pointOther The point on the other entity where the contact occurred, in world space
     * @property {pc.Vec3} normal The normal vector of the contact on the other entity, in world space
     */
    class ContactPoint {
        constructor(localPoint: pc.Vec3, localPointOther: pc.Vec3, point: pc.Vec3, pointOther: pc.Vec3, normal: pc.Vec3);
    }
    /**
     * @constructor
     * @name pc.ContactResult
     * @classdesc Object holding the result of a contact between two Entities
     * @description Create a new ContactResult
     * @param {pc.Entity} other The entity that was involved in the contact with this entity
     * @param {pc.ContactPoint[]} contacts An array of ContactPoints with the other entity
     * @property {pc.Entity} other The entity that was involved in the contact with this entity
     * @property {pc.ContactPoint[]} contacts An array of ContactPoints with the other entity
     */
    class ContactResult {
        constructor(other: pc.Entity, contacts: pc.ContactPoint[]);
    }
    /**
     * @constructor
     * @name pc.RigidBodyComponentSystem
     * @classdesc The RigidBodyComponentSystem maintains the dynamics world for simulating rigid bodies,
     * it also controls global values for the world such as gravity. Note: The RigidBodyComponentSystem
     * is only valid if 3D Physics is enabled in your application. You can enable this in the application
     * settings for your project.
     * @description Create a new RigidBodyComponentSystem
     * @param {pc.Application} app The Application
     * @extends pc.ComponentSystem
     * @property {pc.Vec3} gravity The world space vector representing global gravity in the physics simulation.
     * Defaults to [0, -9.81, 0] which is an approximation of the gravitational force on Earth.
     */
    class RigidBodyComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
        /**
         * @function
         * @name pc.RigidBodyComponentSystem#raycastFirst
         * @description Raycast the world and return the first entity the ray hits. Fire a ray into the world from start to end,
         * if the ray hits an entity with a collision component, it returns a {@link pc.RaycastResult}, otherwise returns null.
         * @param {pc.Vec3} start The world space point where the ray starts
         * @param {pc.Vec3} end The world space point where the ray ends
         * @returns {pc.RaycastResult} The result of the raycasting or null if there was no hit.
         */
        raycastFirst(start: pc.Vec3, end: pc.Vec3): pc.RaycastResult;
    }
    /**
     * @enum pc.SCALEMODE
     * @name pc.SCALEMODE_NONE
     * @description Always use the application's resolution as the resolution for the {@link pc.ScreenComponent}.
     */
    enum SCALEMODE_NONE {
    }
    /**
     * @enum pc.SCALEMODE
     * @name pc.SCALEMODE_BLEND
     * @description Scale the {@link pc.ScreenComponent} when the application's resolution is different than the ScreenComponent's referenceResolution.
     */
    enum SCALEMODE_BLEND {
    }
    /**
     * @component
     * @constructor
     * @name pc.ScreenComponent
     * @classdesc A ScreenComponent enables the Entity to render child {@link pc.ElementComponent}s using anchors and positions in the ScreenComponent's space.
     * @description Create a new ScreenComponent
     * @param {pc.ScreenComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @extends pc.Component
     * @property {Boolean} screenSpace If true then the ScreenComponent will render its child {@link pc.ElementComponent}s in screen space instead of world space. Enable this to create 2D user interfaces.
     * @property {Boolean} cull If true then elements inside this screen will be not be rendered when outside of the screen (only valid when screenSpace is true)
     * @property {String} scaleMode Can either be {@link pc.SCALEMODE_NONE} or {@link pc.SCALEMODE_BLEND}. See the description of referenceResolution for more information.
     * @property {Number} scaleBlend A value between 0 and 1 that is used when scaleMode is equal to {@link pc.SCALEMODE_BLEND}. Scales the ScreenComponent with width as a reference (when value is 0), the height as a reference (when value is 1) or anything in between.
     * @property {pc.Vec2} resolution The width and height of the ScreenComponent. When screenSpace is true the resolution will always be equal to {@link pc.GraphicsDevice#width} x {@link pc.GraphicsDevice#height}.
     * @property {pc.Vec2} referenceResolution The resolution that the ScreenComponent is designed for. This is only taken into account when screenSpace is true and scaleMode is {@link pc.SCALEMODE_BLEND}. If the actual resolution is different then the ScreenComponent will be scaled according to the scaleBlend value.
     */
    class ScreenComponent extends pc.Component {
        constructor(system: pc.ScreenComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.ScreenComponent#syncDrawOrder
         * @description Set the drawOrder of each child {@link pc.ElementComponent}
         * so that ElementComponents which are last in the hierarchy are rendered on top.
         * Draw Order sync is queued and will be updated by the next update loop.
         */
        syncDrawOrder(): void;
    }
    /**
     * @constructor
     * @name pc.ScreenComponentSystem
     * @classdesc Manages creation of {@link pc.ScreenComponent}s.
     * @description Create a new ScreenComponentSystem
     * @param {pc.Application} app The application
     * @extends pc.ComponentSystem
     */
    class ScreenComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @name pc.ScriptComponent
     * @class The ScriptComponent allows you to extend the functionality of an Entity by attaching your own Script Types defined in JavaScript files
     * to be executed with access to the Entity. For more details on scripting see <a href="//developer.playcanvas.com/user-manual/scripting/">Scripting</a>.
     * @param {pc.ScriptComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @extends pc.Component
     * @property {ScriptType[]} scripts An array of all script instances attached to an entity. This Array shall not be modified by developer.
     */
    class ScriptComponent extends pc.Component {
        constructor(system: pc.ScriptComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.ScriptComponent#has
         * @description Detect if script is attached to an entity using name of {@link ScriptType}.
         * @param {String} name The name of the Script Type
         * @returns {Boolean} If script is attached to an entity
         * @example
         * if (entity.script.has('playerController')) {
         *     // entity has script
         * }
         */
        has(name: string): boolean;
        /**
         * @function
         * @name pc.ScriptComponent#create
         * @description Create a script instance using name of a {@link ScriptType} and attach to an entity script component.
         * @param {String} name The name of the Script Type
         * @param {Object} [args] Object with arguments for a script
         * @param {Boolean} [args.enabled] if script instance is enabled after creation
         * @param {Object} [args.attributes] Object with values for attributes, where key is name of an attribute
         * @returns {ScriptType} Returns an instance of a {@link ScriptType} if successfully attached to an entity,
         * or null if it failed because a script with a same name has already been added
         * or if the {@link ScriptType} cannot be found by name in the {@link pc.ScriptRegistry}.
         * @example
         * entity.script.create('playerController', {
         *     attributes: {
         *         speed: 4
         *     }
         * });
         */
        create(name: string, args?: {
            enabled?: boolean;
            attributes?: any;
        }): ScriptType;
        /**
         * @function
         * @name pc.ScriptComponent#destroy
         * @description Destroy the script instance that is attached to an entity.
         * @param {String} name The name of the Script Type
         * @returns {Boolean} If it was successfully destroyed
         * @example
         * entity.script.destroy('playerController');
         */
        destroy(name: string): boolean;
        /**
         * @function
         * @name pc.ScriptComponent#move
         * @description Move script instance to different position to alter update order of scripts within entity.
         * @param {String} name The name of the Script Type
         * @param {Number} ind New position index
         * @returns {Boolean} If it was successfully moved
         * @example
         * entity.script.move('playerController', 0);
         */
        move(name: string, ind: number): boolean;
    }
    /**
     * @name pc.ScriptComponentSystem
     * @description Create a new ScriptComponentSystem
     * @class Allows scripts to be attached to an Entity and executed
     * @param {pc.Application} app The application
     * @extends pc.ComponentSystem
     */
    class ScriptComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.ScrollViewComponent
     * @extends pc.Component
     * @classdesc A ScrollViewComponent enables a group of entities to behave like a masked scrolling area, with optional horizontal and vertical scroll bars.
     * @description Create a new ScrollViewComponent.
     * @param {pc.ScrollViewComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @property {Boolean} horizontal Whether to enable horizontal scrolling.
     * @property {Boolean} vertical Whether to enable vertical scrolling.
     * @property {pc.SCROLL_MODE} scrollMode Specifies how the scroll view should behave when the user scrolls past the end of the content. Modes are defined as follows:
     * <ul>
     *     <li>{@link pc.SCROLL_MODE_CLAMP}: Content does not scroll any further than its bounds.</li>
     *     <li>{@link pc.SCROLL_MODE_BOUNCE}: Content scrolls past its bounds and then gently bounces back.</li>
     *     <li>{@link pc.SCROLL_MODE_INFINITE}: Content can scroll forever.</li>
     * </ul>
     * @property {Number} bounceAmount Controls how far the content should move before bouncing back.
     * @property {Number} friction Controls how freely the content should move if thrown, i.e. by flicking on a phone or by flinging the scroll wheel on a mouse. A value of 1 means that content will stop immediately; 0 means that content will continue moving forever (or until the bounds of the content are reached, depending on the scrollMode).
     * @property {pc.SCROLLBAR_VISIBILITY} horizontalScrollbarVisibility Controls whether the horizontal scrollbar should be visible all the time, or only visible when the content exceeds the size of the viewport.
     * @property {pc.SCROLLBAR_VISIBILITY} verticalScrollbarVisibility Controls whether the vertical scrollbar should be visible all the time, or only visible when the content exceeds the size of the viewport.
     * @property {pc.Entity} viewportEntity The entity to be used as the masked viewport area, within which the content will scroll. This entity must have an ElementGroup component.
     * @property {pc.Entity} contentEntity The entity which contains the scrolling content itself. This entity must have an Element component.
     * @property {pc.Entity} horizontalScrollbarEntity The entity to be used as the vertical scrollbar. This entity must have a Scrollbar component.
     * @property {pc.Entity} verticalScrollbarEntity The entity to be used as the vertical scrollbar. This entity must have a Scrollbar component.
     */
    class ScrollViewComponent extends pc.Component {
        constructor(system: pc.ScrollViewComponentSystem, entity: pc.Entity);
    }
    /**
     * @enum pc.SCROLL_MODE
     * @name pc.SCROLL_MODE_CLAMP
     * @description Content does not scroll any further than its bounds.
     */
    enum SCROLL_MODE_CLAMP {
    }
    /**
     * @enum pc.SCROLL_MODE
     * @name pc.SCROLL_MODE_BOUNCE
     * @description Content scrolls past its bounds and then gently bounces back.
     */
    enum SCROLL_MODE_BOUNCE {
    }
    /**
     * @enum pc.SCROLL_MODE
     * @name pc.SCROLL_MODE_INFINITE
     * @description Content can scroll forever.
     */
    enum SCROLL_MODE_INFINITE {
    }
    /**
     * @enum pc.SCROLLBAR_VISIBILITY
     * @name pc.SCROLLBAR_VISIBILITY_SHOW_ALWAYS
     * @description The scrollbar will be visible all the time.
     */
    enum SCROLLBAR_VISIBILITY_SHOW_ALWAYS {
    }
    /**
     * @enum pc.SCROLLBAR_VISIBILITY
     * @name pc.SCROLLBAR_VISIBILITY_SHOW_WHEN_REQUIRED
     * @description The scrollbar will be visible only when content exceeds the size of the viewport.
     */
    enum SCROLLBAR_VISIBILITY_SHOW_WHEN_REQUIRED {
    }
    /**
     * @constructor
     * @name pc.ScrollViewComponentSystem
     * @extends pc.ComponentSystem
     * @classdesc Manages creation of {@link pc.ScrollViewComponent}s.
     * @description Create a new ScrollViewComponentSystem.
     * @param {pc.Application} app The application
     */
    class ScrollViewComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @component
     * @constructor
     * @name pc.SoundComponent
     * @classdesc The Sound Component controls playback of {@link pc.Sound}s.
     * @description Create a new Sound Component.
     * @param {pc.SoundComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The entity that the Component is attached to
     * @extends pc.Component
     * @property {Number} volume The volume modifier to play the audio with. In range 0-1.
     * @property {Number} pitch The pitch modifier to play the audio with. Must be larger than 0.01
     * @property {Boolean} positional If true the audio will play back at the location of the Entity in space, so the audio will be affect by the position of the {@link pc.AudioListenerComponent}.
     * @property {String} distanceModel Determines which algorithm to use to reduce the volume of the sound as it moves away from the listener. Can be one of {@link pc.DISTANCE_LINEAR}, {@link pc.DISTANCE_INVERSE} or {@link pc.DISTANCE_EXPONENTIAL}. Default is {@link pc.DISTANCE_LINEAR}.
     * @property {Number} refDistance The reference distance for reducing volume as the sound source moves further from the listener.
     * @property {Number} maxDistance The maximum distance from the listener at which audio falloff stops. Note the volume of the audio is not 0 after this distance, but just doesn't fall off anymore.
     * @property {Number} rollOffFactor The factor used in the falloff equation.
     * @property {Object} slots A dictionary that contains the {@link pc.SoundSlot}s managed by this Component.
     */
    class SoundComponent extends pc.Component {
        constructor(system: pc.SoundComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.SoundComponent#addSlot
         * @description Creates a new {@link pc.SoundSlot} with the specified name.
         * @param {String} name The name of the slot
         * @param {Object} options Settings for the slot
         * @param {Number} [options.volume=1] The playback volume, between 0 and 1.
         * @param {Number} [options.pitch=1] The relative pitch, default of 1, plays at normal pitch.
         * @param {Boolean} [options.loop=false] If true the sound will restart when it reaches the end.
         * @param {Number} [options.startTime=0] The start time from which the sound will start playing.
         * @param {Number} [options.duration=null] The duration of the sound that the slot will play starting from startTime.
         * @param {Boolean} [options.overlap=false] If true then sounds played from slot will be played independently of each other. Otherwise the slot will first stop the current sound before starting the new one.
         * @param {Boolean} [options.autoPlay=false] If true the slot will start playing as soon as its audio asset is loaded.
         * @param {Number} [options.asset=null] The asset id of the audio asset that is going to be played by this slot.
         * @returns {pc.SoundSlot} The new slot.
         * @example
         * // get an asset by id
         * var asset = app.assets.get(10);
         * // add a slot
         * this.entity.sound.addSlot('beep', {
         *     asset: asset
         * });
         * // play
         * this.entity.sound.play('beep');
         */
        addSlot(name: string, options: {
            volume?: number;
            pitch?: number;
            loop?: boolean;
            startTime?: number;
            duration?: number;
            overlap?: boolean;
            autoPlay?: boolean;
            asset?: number;
        }): pc.SoundSlot;
        /**
         * @function
         * @name pc.SoundComponent#removeSlot
         * @description Removes the {@link pc.SoundSlot} with the specified name.
         * @param {String} name The name of the slot
         * @example
         * // remove a slot called 'beep'
         * this.entity.sound.removeSlot('beep');
         */
        removeSlot(name: string): void;
        /**
         * @function
         * @name pc.SoundComponent#slot
         * @description Returns the slot with the specified name
         * @param {String} name The name of the slot
         * @returns {pc.SoundSlot} The slot
         * @example
         * // get a slot and set its volume
         * this.entity.sound.slot('beep').volume = 0.5;
         *
         */
        slot(name: string): pc.SoundSlot;
        /**
         * @function
         * @name pc.SoundComponent#play
         * @description Begins playing the sound slot with the specified name. The slot will restart playing if it is already playing unless the overlap field is true in which case a new sound will be created and played.
         * @param {String} name The name of the {@link pc.SoundSlot} to play
         * @example
         * // get asset by id
         * var asset = app.assets.get(10);
         * // create a slot and play it
         * this.entity.sound.addSlot('beep', {
         *     asset: asset
         * });
         * this.entity.sound.play('beep');
         * @returns {pc.SoundInstance} The sound instance that will be played.
         */
        play(name: string): pc.SoundInstance;
        /**
         * @function
         * @name pc.SoundComponent#pause
         * @description Pauses playback of the slot with the specified name. If the name is undefined then all slots currently played will be paused. The slots can be resumed by calling {@link pc.SoundComponent#resume}.
         * @param {String} [name] The name of the slot to pause. Leave undefined to pause everything.
         * @example
         * // pause all sounds
         * this.entity.sound.pause();
         * // pause a specific sound
         * this.entity.sound.pause('beep');
         */
        pause(name?: string): void;
        /**
         * @function
         * @name pc.SoundComponent#resume
         * @description Resumes playback of the sound slot with the specified name if it's paused. If no name is specified all slots will be resumed.
         * @param {String} name The name of the slot to resume. Leave undefined to resume everything.
         * @example
         * // resume all sounds
         * this.entity.sound.resume();
         * // resume a specific sound
         * this.entity.sound.resume('beep');
         */
        resume(name: string): void;
        /**
         * @function
         * @name pc.SoundComponent#stop
         * @description Stops playback of the sound slot with the specified name if it's paused. If no name is specified all slots will be stopped.
         * @param {String} name The name of the slot to stop. Leave undefined to stop everything.
         * @example
         * // stop all sounds
         * this.entity.sound.stop();
         * // stop a specific sound
         * this.entity.sound.stop('beep');
         */
        stop(name: string): void;
    }
    /**
     * @static
     * @readOnly
     * @name pc.DISTANCE_LINEAR
     * @type String
     * @description Linear distance model
     */
    var DISTANCE_LINEAR: string;
    /**
     * @static
     * @readonly
     * @type String
     * @name pc.DISTANCE_INVERSE
     * @description Inverse distance model
     */
    var DISTANCE_INVERSE: string;
    /**
     * @static
     * @readonly
     * @type String
     * @name pc.DISTANCE_EXPONENTIAL
     * @description Exponential distance model
     */
    var DISTANCE_EXPONENTIAL: string;
    /**
     * @constructor
     * @name pc.SoundSlot
     * @classdesc The SoundSlot controls playback of an audio asset.
     * @description Create a new SoundSlot
     * @param {pc.SoundComponent} component The Component that created this slot.
     * @param {String} name The name of the slot.
     * @param {Object} options Settings for the slot
     * @param {Number} [options.volume=1] The playback volume, between 0 and 1.
     * @param {Number} [options.pitch=1] The relative pitch, default of 1, plays at normal pitch.
     * @param {Boolean} [options.loop=false] If true the sound will restart when it reaches the end.
     * @param {Number} [options.startTime=0] The start time from which the sound will start playing.
     * @param {Number} [options.duration=null] The duration of the sound that the slot will play starting from startTime.
     * @param {Boolean} [options.overlap=false] If true then sounds played from slot will be played independently of each other. Otherwise the slot will first stop the current sound before starting the new one.
     * @param {Boolean} [options.autoPlay=false] If true the slot will start playing as soon as its audio asset is loaded.
     * @param {Number} [options.asset=null] The asset id of the audio asset that is going to be played by this slot.
     * @property {String} name The name of the slot
     * @property {String} asset The asset id
     * @property {Boolean} autoPlay If true the slot will begin playing as soon as it is loaded
     * @property {Number} volume The volume modifier to play the sound with. In range 0-1.
     * @property {Number} pitch The pitch modifier to play the sound with. Must be larger than 0.01
     * @property {Number} startTime The start time from which the sound will start playing.
     * @property {Number} duration The duration of the sound that the slot will play starting from startTime.
     * @property {Boolean} loop If true the slot will restart when it finishes playing
     * @property {Boolean} overlap If true then sounds played from slot will be played independently of each other. Otherwise the slot will first stop the current sound before starting the new one.
     * @property {Boolean} isLoaded Returns true if the asset of the slot is loaded.
     * @property {Boolean} isPlaying Returns true if the slot is currently playing.
     * @property {Boolean} isPaused Returns true if the slot is currently paused.
     * @property {Boolean} isStopped Returns true if the slot is currently stopped.
     * @property {pc.SoundInstance[]} instances An array that contains all the {@link pc.SoundInstance}s currently being played by the slot.
     */
    class SoundSlot {
        constructor(component: pc.SoundComponent, name: string, options: {
            volume?: number;
            pitch?: number;
            loop?: boolean;
            startTime?: number;
            duration?: number;
            overlap?: boolean;
            autoPlay?: boolean;
            asset?: number;
        });
        /**
         * @function pc.SoundSlot#play
         * @description Plays a sound. If {@link pc.SoundSlot#overlap} is true the new sound
         * instance will be played independently of any other instances already playing.
         * Otherwise existing sound instances will stop before playing the new sound.
         * @returns {pc.SoundInstance} The new sound instance
         */
        play(): pc.SoundInstance;
        /**
         * @function
         * @name pc.SoundSlot#pause
         * @description Pauses all sound instances. To continue playback call {@link pc.SoundSlot#resume}.
         * @returns {Boolean} true if the sound instances paused successfully, false otherwise.
         */
        pause(): boolean;
        /**
         * @function
         * @name pc.SoundSlot#resume
         * @description Resumes playback of all paused sound instances.
         * @returns {Boolean} True if any instances were resumed.
         */
        resume(): boolean;
        /**
         * @function
         * @name pc.SoundSlot#stop
         * @description Stops playback of all sound instances.
         * @returns {Boolean} True if any instances were stopped.
         */
        stop(): boolean;
        /**
         * @function
         * @name pc.SoundSlot#load
         * @description Loads the asset assigned to this slot.
         */
        load(): void;
        /**
         * @function
         * @name pc.SoundSlot#setExternalNodes
         * @description Connect external Web Audio API nodes. Any sound played by this slot will
         * automatically attach the specified nodes to the source that plays the sound. You need to pass
         * the first node of the node graph that you created externally and the last node of that graph. The first
         * node will be connected to the audio source and the last node will be connected to the destination of the AudioContext (e.g. speakers).
         * @param {AudioNode} firstNode The first node that will be connected to the audio source of sound instances.
         * @param {AudioNode} [lastNode] The last node that will be connected to the destination of the AudioContext.
         * If unspecified then the firstNode will be connected to the destination instead.
         * @example
         * var context = app.systems.sound.context;
         * var analyzer = context.createAnalyzer();
         * var distortion = context.createWaveShaper();
         * var filter = context.createBiquadFilter();
         * analyzer.connect(distortion);
         * distortion.connect(filter);
         * slot.setExternalNodes(analyzer, filter);
         */
        setExternalNodes(firstNode: AudioNode, lastNode?: AudioNode): void;
        /**
         * @function
         * @name pc.SoundSlot#clearExternalNodes
         * @description Clears any external nodes set by {@link pc.SoundSlot#setExternalNodes}.
         */
        clearExternalNodes(): void;
        /**
         * @function
         * @name pc.SoundSlot#getExternalNodes
         * @description Gets an array that contains the two external nodes set by {@link pc.SoundSlot#setExternalNodes}.
         * @returns {AudioNode[]} An array of 2 elements that contains the first and last nodes set by {@link pc.SoundSlot#setExternalNodes}.
         */
        getExternalNodes(): AudioNode[];
    }
    /**
     * @constructor
     * @name pc.SoundComponentSystem
     * @classdesc Manages creation of {@link pc.SoundComponent}s.
     * @description Create a SoundComponentSystem
     * @param {pc.Application} app The Application
     * @param {pc.SoundManager} manager The sound manager
     * @property {Number} volume Sets / gets the volume for the entire Sound system. All sounds will have their volume
     * multiplied by this value. Valid between [0, 1].
     * @property {AudioContext} context Gets the AudioContext currently used by the sound manager. Requires Web Audio API support.
     * @property {pc.SoundManager} manager Gets / sets the sound manager
     * @extends pc.ComponentSystem
     */
    class SoundComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application, manager: pc.SoundManager);
    }
    /**
     * @enum pc.SPRITETYPE
     * @name pc.SPRITETYPE_SIMPLE
     * @description A {@link pc.SpriteComponent} that displays a single frame from a sprite asset.
     */
    enum SPRITETYPE_SIMPLE {
    }
    /**
     * @enum pc.SPRITETYPE
     * @name pc.SPRITETYPE_ANIMATED
     * @description A {@link pc.SpriteComponent} that renders sprite animations.
     */
    enum SPRITETYPE_ANIMATED {
    }
    /**
     * @component
     * @constructor
     * @name pc.SpriteComponent
     * @extends pc.Component
     * @classdesc Enables an Entity to render a simple static sprite or sprite animations.
     * @param {pc.SpriteComponentSystem} system The ComponentSystem that created this Component
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @property {String} type The type of the SpriteComponent. Can be one of the following:
     * <ul>
     *     <li>pc.SPRITETYPE_SIMPLE: The component renders a single frame from a sprite asset.
     *     <li>pc.SPRITETYPE_ANIMATED: The component can play sprite animation clips.
     * </ul>
     * @property {Number} frame The frame counter of the sprite. Specifies which frame from the current sprite asset to render.
     * @property {Number} spriteAsset The id of the sprite asset to render. Only works for {@link pc.SPRITETYPE_SIMPLE} types.
     * @property {pc.Sprite} sprite The current sprite.
     * @property {pc.Color} color The color tint of the sprite.
     * @property {Number} opacity The opacity of the sprite.
     * @property {Boolean} flipX Flip the X axis when rendering a sprite.
     * @property {Boolean} flipY Flip the Y axis when rendering a sprite.
     * @property {Object} clips A dictionary that contains {@link pc.SpriteAnimationClip}s.
     * @property {pc.SpriteAnimationClip} currentClip The current clip being played.
     * @property {Number} speed A global speed modifier used when playing sprite animation clips.
     * @property {Number} batchGroupId Assign sprite to a specific batch group (see {@link pc.BatchGroup}). Default value is -1 (no group).
     * @property {String} autoPlayClip The name of the clip to play automatically when the component is enabled and the clip exists.
     * @property {Number[]} layers An array of layer IDs ({@link pc.Layer#id}) to which this sprite should belong.
     * @property {Number} drawOrder The draw order of the component. A higher value means that the component will be rendered on top of other components in the same layer.
     */
    class SpriteComponent extends pc.Component {
        constructor(system: pc.SpriteComponentSystem, entity: pc.Entity);
        /**
         * @function
         * @name pc.SpriteComponent#addClip
         * @description Creates and adds a new {@link pc.SpriteAnimationClip} to the component's clips.
         * @param {Object} data Data for the new animation clip.
         * @param {String} [data.name] The name of the new animation clip.
         * @param {Number} [data.fps] Frames per second for the animation clip.
         * @param {Object} [data.loop] Whether to loop the animation clip.
         * @param {Number} [data.spriteAsset] The id of the sprite asset that this clip will play.
         * @returns {pc.SpriteAnimationClip} The new clip that was added.
         */
        addClip(data: {
            name?: string;
            fps?: number;
            loop?: any;
            spriteAsset?: number;
        }): pc.SpriteAnimationClip;
        /**
         * @function
         * @name pc.SpriteComponent#removeClip
         * @description Removes a clip by name.
         * @param {String} name The name of the animation clip to remove.
         */
        removeClip(name: string): void;
        /**
         * @function
         * @name pc.SpriteComponent#clip
         * @description Get an animation clip by name.
         * @param {String} name The name of the clip.
         * @returns {pc.SpriteAnimationClip} The clip.
         */
        clip(name: string): pc.SpriteAnimationClip;
        /**
         * @function
         * @name pc.SpriteComponent#play
         * @description Plays a sprite animation clip by name. If the animation clip is already playing then this will do nothing.
         * @param {String} name The name of the clip to play.
         * @returns {pc.SpriteAnimationClip} The clip that started playing.
         */
        play(name: string): pc.SpriteAnimationClip;
        /**
         * @function
         * @name pc.SpriteComponent#pause
         * @description Pauses the current animation clip.
         */
        pause(): void;
        /**
         * @function
         * @name pc.SpriteComponent#resume
         * @description Resumes the current paused animation clip.
         */
        resume(): void;
        /**
         * @function
         * @name pc.SpriteComponent#stop
         * @description Stops the current animation clip and resets it to the first frame.
         */
        stop(): void;
    }
    /**
     * @constructor
     * @name pc.SpriteAnimationClip
     * @classdesc Handles playing of sprite animations and loading of relevant sprite assets.
     * @param {pc.SpriteComponent} component The sprite component managing this clip.
     * @param {Object} data Data for the new animation clip.
     * @param {Number} [data.fps] Frames per second for the animation clip.
     * @param {Object} [data.loop] Whether to loop the animation clip.
     * @param {String} [data.name] The name of the new animation clip.
     * @param {Number} [data.spriteAsset] The id of the sprite asset that this clip will play.
     * @property {Number} spriteAsset The id of the sprite asset used to play the animation.
     * @property {pc.Sprite} sprite The current sprite used to play the animation.
     * @property {Number} frame The index of the frame of the {@link pc.Sprite} currently being rendered.
     * @property {Number} time The current time of the animation in seconds.
     * @property {Number} duration The total duration of the animation in seconds.
     * @property {Boolean} isPlaying Whether the animation is currently playing.
     * @property {Boolean} isPaused Whether the animation is currently paused.
     */
    class SpriteAnimationClip {
        constructor(component: pc.SpriteComponent, data: {
            fps?: number;
            loop?: any;
            name?: string;
            spriteAsset?: number;
        });
        /**
         * @function
         * @name pc.SpriteAnimationClip#play
         * @description Plays the animation. If it's already playing then this does nothing.
         */
        play(): void;
        /**
         * @function
         * @name pc.SpriteAnimationClip#pause
         * @description Pauses the animation.
         */
        pause(): void;
        /**
         * @function
         * @name pc.SpriteAnimationClip#resume
         * @description Resumes the paused animation.
         */
        resume(): void;
        /**
         * @function
         * @name pc.SpriteAnimationClip#stop
         * @description Stops the animation and resets the animation to the first frame.
         */
        stop(): void;
    }
    /**
     * @constructor
     * @name pc.SpriteComponentSystem
     * @classdesc Manages creation of {@link pc.SpriteComponent}s.
     * @param {pc.Application} app The application
     * @extends pc.ComponentSystem
     */
    class SpriteComponentSystem extends pc.ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @constructor
     * @name pc.ComponentSystem
     * @classdesc Component Systems contain the logic and functionality to update all Components of a particular type.
     * @param {pc.Application} app The application managing this system.
     */
    class ComponentSystem {
        constructor(app: pc.Application);
    }
    /**
     * @constructor
     * @name pc.Font
     * @classdesc Represents the resource of a font asset.
     * @param {pc.Texture[]} textures The font textures
     * @param {Object} data The font data
     * @property {Number} intensity The font intensity
     * @property {pc.Texture[]} textures The font textures
     */
    class Font {
        constructor(textures: pc.Texture[], data: any);
    }
    /**
     * @constructor
     * @name pc.Entity
     * @classdesc The Entity is the core primitive of a PlayCanvas game. Generally speaking an object in your game will consist of an {@link pc.Entity},
     * and a set of {@link pc.Component}s which are managed by their respective {@link pc.ComponentSystem}s. One of those components maybe a
     * {@link pc.ScriptComponent} which allows you to write custom code to attach to your Entity.
     * <p>
     * The Entity uniquely identifies the object and also provides a transform for position and orientation
     * which it inherits from {@link pc.GraphNode} so can be added into the scene graph.
     * The Component and ComponentSystem provide the logic to give an Entity a specific type of behavior. e.g. the ability to
     * render a model or play a sound. Components are specific to an instance of an Entity and are attached (e.g. `this.entity.model`)
     * ComponentSystems allow access to all Entities and Components and are attached to the {@link pc.Application}.
     * @param {String} [name] The non-unique name of the entity, default is "Untitled".
     * @param {pc.Application} [app] The application the entity belongs to, default is the current application.
     * @example
     * var app = ... // Get the pc.Application
     *
     * var entity = new pc.Entity();
     *
     * // Add a Component to the Entity
     * entity.addComponent("camera", {
     *   fov: 45,
     *   nearClip: 1,
     *   farClip: 10000
     * });
     *
     * // Add the Entity into the scene graph
     * app.root.addChild(entity);
     *
     * // Move the entity
     * entity.translate(10, 0, 0);
     *
     * // Or translate it by setting it's position directly
     * var p = entity.getPosition();
     * entity.setPosition(p.x + 10, p.y, p.z);
     *
     * // Change the entity's rotation in local space
     * var e = entity.getLocalEulerAngles();
     * entity.setLocalEulerAngles(e.x, e.y + 90, e.z);
     *
     * // Or use rotateLocal
     * entity.rotateLocal(0, 90, 0);
     *
     * @extends pc.GraphNode
     */
    class Entity extends pc.GraphNode {
        constructor(name?: string, app?: pc.Application);
        /**
         * @function
         * @name pc.Entity#addComponent
         * @description Create a new component and add it to the entity.
         * Use this to add functionality to the entity like rendering a model, playing sounds and so on.
         * @param {String} type The name of the component to add. Valid strings are:
         * <ul>
         *   <li>"animation" - see {@link pc.AnimationComponent}</li>
         *   <li>"audiolistener" - see {@link pc.AudioListenerComponent}</li>
         *   <li>"camera" - see {@link pc.CameraComponent}</li>
         *   <li>"collision" - see {@link pc.CollisionComponent}</li>
         *   <li>"element" - see {@link pc.ElementComponent}</li>
         *   <li>"light" - see {@link pc.LightComponent}</li>
         *   <li>"layoutchild" - see {@link pc.LayoutChildComponent}</li>
         *   <li>"layoutgroup" - see {@link pc.LayoutGroupComponent}</li>
         *   <li>"model" - see {@link pc.ModelComponent}</li>
         *   <li>"particlesystem" - see {@link pc.ParticleSystemComponent}</li>
         *   <li>"rigidbody" - see {@link pc.RigidBodyComponent}</li>
         *   <li>"screen" - see {@link pc.ScreenComponent}</li>
         *   <li>"script" - see {@link pc.ScriptComponent}</li>
         *   <li>"sound" - see {@link pc.SoundComponent}</li>
         *   <li>"zone" - see {@link pc.ZoneComponent}</li>
         * </ul>
         * @param {Object} data The initialization data for the specific component type. Refer to each
         * specific component's API reference page for details on valid values for this parameter.
         * @returns {pc.Component} The new Component that was attached to the entity or null if there
         * was an error.
         * @example
         * var entity = new pc.Entity();
         * entity.addComponent("light"); // Add a light component with default properties
         * entity.addComponent("camera", { // Add a camera component with some specified properties
         *   fov: 45,
         *   clearColor: new pc.Color(1,0,0),
         * });
         */
        addComponent(type: string, data: any): pc.Component;
        /**
         * @function
         * @name pc.Entity#removeComponent
         * @description Remove a component from the Entity.
         * @param {String} type The name of the Component type
         * @example
         * var entity = new pc.Entity();
         * entity.addComponent("light"); // add new light component
         * //...
         * entity.removeComponent("light"); // remove light component
         */
        removeComponent(type: string): void;
        /**
         * @function
         * @name pc.Entity#findComponent
         * @description Search the entity and all of its descendants for the first component of specified type.
         * @param {String} type The name of the component type to retrieve.
         * @returns {pc.Component} A component of specified type, if the entity or any of its descendants has
         * one. Returns undefined otherwise.
         * @example
         * // Get the first found light component in the hierarchy tree that starts with this entity
         * var light = entity.findComponent("light");
         */
        findComponent(type: string): pc.Component;
        /**
         * @function
         * @name pc.Entity#findComponents
         * @description Search the entity and all of its descendants for all components of specified type.
         * @param {String} type The name of the component type to retrieve.
         * @returns {pc.Component} All components of specified type in the entity or any of its descendants.
         * Returns empty array if none found.
         * @example
         * // Get all light components in the hierarchy tree that starts with this entity
         * var lights = entity.findComponents("light");
         */
        findComponents(type: string): pc.Component;
        /**
         * @function
         * @name pc.Entity#findByGuid
         * @description Find a descendant of this Entity with the GUID
         * @param {String} guid The GUID to search for.
         * @returns {pc.Entity} The Entity with the GUID or null
         */
        findByGuid(guid: string): pc.Entity;
        /**
         * @function
         * @name pc.Entity#destroy
         * @description Remove all components from the Entity and detach it from the Entity hierarchy. Then recursively destroy all ancestor Entities
         * @example
         * var firstChild = this.entity.children[0];
         * firstChild.destroy(); // delete child, all components and remove from hierarchy
         */
        destroy(): void;
        /**
         * @function
         * @name pc.Entity#clone
         * @description Create a deep copy of the Entity. Duplicate the full Entity hierarchy, with all Components and all descendants.
         * Note, this Entity is not in the hierarchy and must be added manually.
         * @returns {pc.Entity} A new Entity which is a deep copy of the original.
         * @example
         *   var e = this.entity.clone(); // Clone Entity
         *   this.entity.parent.addChild(e); // Add it as a sibling to the original
         */
        clone(): pc.Entity;
        /**
         * @readonly
         * @name pc.GraphNode#right
         * @description The normalized local space X-axis vector of the graph node in world space.
         * @type pc.Vec3
         */
        readonly right: pc.Vec3;
        /**
         * @readonly
         * @name pc.GraphNode#up
         * @description The normalized local space Y-axis vector of the graph node in world space.
         * @type pc.Vec3
         */
        readonly up: pc.Vec3;
        /**
         * @readonly
         * @name pc.GraphNode#forward
         * @description The normalized local space negative Z-axis vector of the graph node in world space.
         * @type pc.Vec3
         */
        readonly forward: pc.Vec3;
        /**
         * @name pc.GraphNode#enabled
         * @type Boolean
         * @description Enable or disable a GraphNode. If one of the GraphNode's parents is disabled
         * there will be no other side effects. If all the parents are enabled then
         * the new value will activate / deactivate all the enabled children of the GraphNode.
         */
        enabled: boolean;
        /**
         * @readonly
         * @name pc.GraphNode#parent
         * @type pc.GraphNode
         * @description A read-only property to get a parent graph node
         */
        readonly parent: pc.GraphNode;
        /**
         * @readonly
         * @name pc.GraphNode#path
         * @type pc.GraphNode
         * @description A read-only property to get the path of the graph node relative to
         * the root of the hierarchy
         */
        readonly path: pc.GraphNode;
        /**
         * @readonly
         * @name pc.GraphNode#root
         * @type pc.GraphNode
         * @description A read-only property to get highest graph node from current node
         */
        readonly root: pc.GraphNode;
        /**
         * @readonly
         * @name pc.GraphNode#children
         * @type pc.GraphNode[]
         * @description A read-only property to get the children of this graph node.
         */
        readonly children: pc.GraphNode[];
        /**
         * @readonly
         * @name pc.GraphNode#graphDepth
         * @type Number
         * @description A read-only property to get the depth of this child within the graph. Note that for performance reasons this is only recalculated when a node is added to a new parent, i.e. it is not recalculated when a node is simply removed from the graph.
         */
        readonly graphDepth: number;
        /**
         * @function
         * @name pc.GraphNode#find
         * @description Search the graph node and all of its descendants for the nodes that satisfy some search criteria.
         * @param {Function|String} attr This can either be a function or a string. If it's a function, it is executed
         * for each descendant node to test if node satisfies the search logic. Returning true from the function will
         * include the node into the results. If it's a string then it represents the name of a field or a method of the
         * node. If this is the name of a field then the value passed as the second argument will be checked for equality.
         * If this is the name of a function then the return value of the function will be checked for equality against
         * the valued passed as the second argument to this function.
         * @param {Object} [value] If the first argument (attr) is a property name then this value will be checked against
         * the value of the property.
         * @returns {pc.GraphNode[]} The array of graph nodes that match the search criteria.
         * @example
         * // Finds all nodes that have a model component and have `door` in their lower-cased name
         * var doors = house.find(function(node) {
         *     return node.model && node.name.toLowerCase().indexOf('door') !== -1;
         * });
         * @example
         * // Finds all nodes that have the name property set to 'Test'
         * var entities = parent.find('name', 'Test');
         */
        find(attr: ((...params: any[]) => any) | string, value?: any): pc.GraphNode[];
        /**
         * @function
         * @name pc.GraphNode#findOne
         * @description Search the graph node and all of its descendants for the first node that satisfies some search criteria.
         * @param {Function|String} attr This can either be a function or a string. If it's a function, it is executed
         * for each descendant node to test if node satisfies the search logic. Returning true from the function will
         * result in that node being returned from findOne. If it's a string then it represents the name of a field or a method of the
         * node. If this is the name of a field then the value passed as the second argument will be checked for equality.
         * If this is the name of a function then the return value of the function will be checked for equality against
         * the valued passed as the second argument to this function.
         * @param {Object} [value] If the first argument (attr) is a property name then this value will be checked against
         * the value of the property.
         * @returns {pc.GraphNode} A graph node that match the search criteria.
         * @example
         * // Find the first node that is called `head` and has a model component
         * var head = player.findOne(function(node) {
         *     return node.model && node.name === 'head';
         * });
         * @example
         * // Finds the first node that has the name property set to 'Test'
         * var node = parent.findOne('name', 'Test');
         */
        findOne(attr: ((...params: any[]) => any) | string, value?: any): pc.GraphNode;
        /**
         * @function
         * @name pc.GraphNode#findByTag
         * @description Return all graph nodes that satisfy the search query.
         * Query can be simply a string, or comma separated strings,
         * to have inclusive results of assets that match at least one query.
         * A query that consists of an array of tags can be used to match graph nodes that have each tag of array
         * @param {String} query Name of a tag or array of tags
         * @returns {pc.GraphNode[]} A list of all graph nodes that match the query
         * @example
         * // Return all graph nodes that tagged by `animal`
         * var animals = node.findByTag("animal");
         * @example
         * // Return all graph nodes that tagged by `bird` OR `mammal`
         * var birdsAndMammals = node.findByTag("bird", "mammal");
         * @example
         * // Return all assets that tagged by `carnivore` AND `mammal`
         * var meatEatingMammals = node.findByTag([ "carnivore", "mammal" ]);
         * @example
         * // Return all assets that tagged by (`carnivore` AND `mammal`) OR (`carnivore` AND `reptile`)
         * var meatEatingMammalsAndReptiles = node.findByTag([ "carnivore", "mammal" ], [ "carnivore", "reptile" ]);
         */
        findByTag(query: string): pc.GraphNode[];
        /**
         * @function
         * @name pc.GraphNode#findByName
         * @description Get the first node found in the graph with the name. The search
         * is depth first.
         * @param {String} name The name of the graph.
         * @returns {pc.GraphNode} The first node to be found matching the supplied name.
         */
        findByName(name: string): pc.GraphNode;
        /**
         * @function
         * @name pc.GraphNode#findByPath
         * @description Get the first node found in the graph by its full path in the graph.
         * The full path has this form 'parent/child/sub-child'. The search is depth first.
         * @param {String} path The full path of the pc.GraphNode.
         * @returns {pc.GraphNode} The first node to be found matching the supplied path.
         * @example
         * var path = this.entity.findByPath('child/another_child');
         */
        findByPath(path: string): pc.GraphNode;
        /**
         * @function
         * @name pc.GraphNode#forEach
         * @description Executes a provided function once on this graph node and all of its descendants.
         * @param {Function} callback The function to execute on the graph node and each descendant.
         * @param {Object} [thisArg] Optional value to use as this when executing callback function.
         * @example
         * // Log the path and name of each node in descendant tree starting with "parent"
         * parent.forEach(function (node) {
         *     console.log(node.path + "/" + node.name);
         * });
         */
        forEach(callback: (...params: any[]) => any, thisArg?: any): void;
        /**
         * @function
         * @name pc.GraphNode#isDescendantOf
         * @description Check if node is descendant of another node.
         * @param {pc.GraphNode} node Potential ancestor of node.
         * @returns {Boolean} if node is descendant of another node.
         * @example
         * if (roof.isDescendantOf(house)) {
         *     // roof is descendant of house entity
         * }
         */
        isDescendantOf(node: pc.GraphNode): boolean;
        /**
         * @function
         * @name pc.GraphNode#isAncestorOf
         * @description Check if node is ancestor for another node.
         * @param {pc.GraphNode} node Potential descendant of node.
         * @returns {Boolean} if node is ancestor for another node
         * @example
         * if (body.isAncestorOf(foot)) {
         *     // foot is within body's hierarchy
         * }
         */
        isAncestorOf(node: pc.GraphNode): boolean;
        /**
         * @function
         * @name pc.GraphNode#getEulerAngles
         * @description Get the world space rotation for the specified GraphNode in Euler angle
         * form. The order of the returned Euler angles is XYZ. The value returned by this function
         * should be considered read-only. In order to set the world-space rotation of the graph
         * node, use {@link pc.GraphNode#setEulerAngles}.
         * @returns {pc.Vec3} The world space rotation of the graph node in Euler angle form.
         * @example
         * var angles = this.entity.getEulerAngles(); // [0,0,0]
         * angles[1] = 180; // rotate the entity around Y by 180 degrees
         * this.entity.setEulerAngles(angles);
         */
        getEulerAngles(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalEulerAngles
         * @description Get the rotation in local space for the specified GraphNode. The rotation
         * is returned as euler angles in a 3-dimensional vector where the order is XYZ. The
         * returned vector should be considered read-only. To update the local rotation, use
         * {@link pc.GraphNode#setLocalEulerAngles}.
         * @returns {pc.Vec3} The local space rotation of the graph node as euler angles in XYZ order.
         * @example
         * var angles = this.entity.getLocalEulerAngles();
         * angles[1] = 180;
         * this.entity.setLocalEulerAngles(angles);
         */
        getLocalEulerAngles(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalPosition
         * @description Get the position in local space for the specified GraphNode. The position
         * is returned as a 3-dimensional vector. The returned vector should be considered read-only.
         * To update the local position, use {@link pc.GraphNode#setLocalPosition}.
         * @returns {pc.Vec3} The local space position of the graph node.
         * @example
         * var position = this.entity.getLocalPosition();
         * position[0] += 1; // move the entity 1 unit along x.
         * this.entity.setLocalPosition(position);
         */
        getLocalPosition(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalRotation
         * @description Get the rotation in local space for the specified GraphNode. The rotation
         * is returned as a quaternion. The returned quaternion should be considered read-only.
         * To update the local rotation, use {@link pc.GraphNode#setLocalRotation}.
         * @returns {pc.Quat} The local space rotation of the graph node as a quaternion.
         * @example
         * var rotation = this.entity.getLocalRotation();
         */
        getLocalRotation(): pc.Quat;
        /**
         * @function
         * @name pc.GraphNode#getLocalScale
         * @description Get the scale in local space for the specified GraphNode. The scale
         * is returned as a 3-dimensional vector. The returned vector should be considered read-only.
         * To update the local scale, use {@link pc.GraphNode#setLocalScale}.
         * @returns {pc.Vec3} The local space scale of the graph node.
         * @example
         * var scale = this.entity.getLocalScale();
         * scale.x = 100;
         * this.entity.setLocalScale(scale);
         */
        getLocalScale(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalTransform
         * @description Get the local transform matrix for this graph node. This matrix
         * is the transform relative to the node's parent's world transformation matrix.
         * @returns {pc.Mat4} The node's local transformation matrix.
         * @example
         * var transform = this.entity.getLocalTransform();
         */
        getLocalTransform(): pc.Mat4;
        /**
         * @function
         * @name pc.GraphNode#getPosition
         * @description Get the world space position for the specified GraphNode. The
         * value returned by this function should be considered read-only. In order to set
         * the world-space position of the graph node, use {@link pc.GraphNode#setPosition}.
         * @returns {pc.Vec3} The world space position of the graph node.
         * @example
         * var position = this.entity.getPosition();
         * position.x = 10;
         * this.entity.setPosition(position);
         */
        getPosition(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getRotation
         * @description Get the world space rotation for the specified GraphNode in quaternion
         * form. The value returned by this function should be considered read-only. In order
         * to set the world-space rotation of the graph node, use {@link pc.GraphNode#setRotation}.
         * @returns {pc.Quat} The world space rotation of the graph node as a quaternion.
         * @example
         * var rotation = this.entity.getRotation();
         */
        getRotation(): pc.Quat;
        /**
         * @function
         * @name pc.GraphNode#getWorldTransform
         * @description Get the world transformation matrix for this graph node.
         * @returns {pc.Mat4} The node's world transformation matrix.
         * @example
         * var transform = this.entity.getWorldTransform();
         */
        getWorldTransform(): pc.Mat4;
        /**
         * @function
         * @name pc.GraphNode#reparent
         * @description Remove graph node from current parent and add as child to new parent
         * @param {pc.GraphNode} parent New parent to attach graph node to
         * @param {Number} index (optional) The child index where the child node should be placed.
         */
        reparent(parent: pc.GraphNode, index: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalEulerAngles
         * @description Sets the local-space rotation of the specified graph node using euler angles.
         * Eulers are interpreted in XYZ order. Eulers must be specified in degrees. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * local-space euler rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding eulers or rotation around local-space
         * x-axis in degrees.
         * @param {Number} [y] - rotation around local-space y-axis in degrees.
         * @param {Number} [z] - rotation around local-space z-axis in degrees.
         * @example
         * // Set rotation of 90 degrees around y-axis via 3 numbers
         * this.entity.setLocalEulerAngles(0, 90, 0);
         * @example
         * // Set rotation of 90 degrees around y-axis via a vector
         * var angles = new pc.Vec3(0, 90, 0);
         * this.entity.setLocalEulerAngles(angles);
         */
        setLocalEulerAngles(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalPosition
         * @description Sets the local-space position of the specified graph node. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * local-space position.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space position or
         * x-coordinate of local-space position.
         * @param {Number} [y] - y-coordinate of local-space position.
         * @param {Number} [z] - z-coordinate of local-space position.
         * @example
         * // Set via 3 numbers
         * this.entity.setLocalPosition(0, 10, 0);
         * @example
         * // Set via vector
         * var pos = new pc.Vec3(0, 10, 0);
         * this.entity.setLocalPosition(pos)
         */
        setLocalPosition(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalRotation
         * @description Sets the local-space rotation of the specified graph node. This function
         * has two valid signatures: you can either pass a quaternion or 3 numbers to specify the
         * local-space rotation.
         * @param {pc.Quat|Number} x - quaternion holding local-space rotation or x-component of
         * local-space quaternion rotation.
         * @param {Number} [y] - y-component of local-space quaternion rotation.
         * @param {Number} [z] - z-component of local-space quaternion rotation.
         * @param {Number} [w] - w-component of local-space quaternion rotation.
         * @example
         * // Set via 4 numbers
         * this.entity.setLocalRotation(0, 0, 0, 1);
         * @example
         * // Set via quaternion
         * var q = pc.Quat();
         * this.entity.setLocalRotation(q);
         */
        setLocalRotation(x: pc.Quat | number, y?: number, z?: number, w?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalScale
         * @description Sets the local-space scale factor of the specified graph node. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * local-space scale.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space scale or x-coordinate
         * of local-space scale.
         * @param {Number} [y] - y-coordinate of local-space scale.
         * @param {Number} [z] - z-coordinate of local-space scale.
         * @example
         * // Set via 3 numbers
         * this.entity.setLocalScale(10, 10, 10);
         * @example
         * // Set via vector
         * var scale = new pc.Vec3(10, 10, 10);
         * this.entity.setLocalScale(scale);
         */
        setLocalScale(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setPosition
         * @description Sets the world-space position of the specified graph node. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * world-space position.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding world-space position or
         * x-coordinate of world-space position.
         * @param {Number} [y] - y-coordinate of world-space position.
         * @param {Number} [z] - z-coordinate of world-space position.
         * @example
         * // Set via 3 numbers
         * this.entity.setPosition(0, 10, 0);
         * @example
         * // Set via vector
         * var position = new pc.Vec3(0, 10, 0);
         * this.entity.setPosition(position);
         */
        setPosition(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setRotation
         * @description Sets the world-space rotation of the specified graph node. This function
         * has two valid signatures: you can either pass a quaternion or 3 numbers to specify the
         * world-space rotation.
         * @param {pc.Quat|Number} x - quaternion holding world-space rotation or x-component of
         * world-space quaternion rotation.
         * @param {Number} [y] - y-component of world-space quaternion rotation.
         * @param {Number} [z] - z-component of world-space quaternion rotation.
         * @param {Number} [w] - w-component of world-space quaternion rotation.
         * @example
         * // Set via 4 numbers
         * this.entity.setRotation(0, 0, 0, 1);
         * @example
         * // Set via quaternion
         * var q = pc.Quat();
         * this.entity.setRotation(q);
         */
        setRotation(x: pc.Quat | number, y?: number, z?: number, w?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setEulerAngles
         * @description Sets the world-space rotation of the specified graph node using euler angles.
         * Eulers are interpreted in XYZ order. Eulers must be specified in degrees. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * world-space euler rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding eulers or rotation around world-space
         * x-axis in degrees.
         * @param {Number} [y] - rotation around world-space y-axis in degrees.
         * @param {Number} [z] - rotation around world-space z-axis in degrees.
         * @example
         * // Set rotation of 90 degrees around world-space y-axis via 3 numbers
         * this.entity.setEulerAngles(0, 90, 0);
         * @example
         * // Set rotation of 90 degrees around world-space y-axis via a vector
         * var angles = new pc.Vec3(0, 90, 0);
         * this.entity.setEulerAngles(angles);
         */
        setEulerAngles(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#addChild
         * @description Add a new child to the child list and update the parent value of the child node
         * @param {pc.GraphNode} node The new child to add
         * @example
         * var e = new pc.Entity(app);
         * this.entity.addChild(e);
         */
        addChild(node: pc.GraphNode): void;
        /**
         * @function
         * @name pc.GraphNode#insertChild
         * @description Insert a new child to the child list at the specified index and update the parent value of the child node
         * @param {pc.GraphNode} node The new child to insert
         * @param {Number} index The index in the child list of the parent where the new node will be inserted
         * @example
         * var e = new pc.Entity(app);
         * this.entity.insertChild(e, 1);
         */
        insertChild(node: pc.GraphNode, index: number): void;
        /**
         * @function
         * @name pc.GraphNode#removeChild
         * @description Remove the node from the child list and update the parent value of the child.
         * @param {pc.GraphNode} child The node to remove.
         * @example
         * var child = this.entity.children[0];
         * this.entity.removeChild(child);
         */
        removeChild(child: pc.GraphNode): void;
        /**
         * @function
         * @name pc.GraphNode#lookAt
         * @description Reorients the graph node so that the negative z-axis points towards the target.
         * This function has two valid signatures. Either pass 3D vectors for the look at coordinate and up
         * vector, or pass numbers to represent the vectors.
         * @param {pc.Vec3|Number} x - If passing a 3D vector, this is the world-space coordinate to look at.
         * Otherwise, it is the x-component of the world-space coordinate to look at.
         * @param {pc.Vec3|Number} y - If passing a 3D vector, this is the world-space up vector for look at
         * transform. Otherwise, it is the y-component of the world-space coordinate to look at.
         * @param {Number} z - z-component of the world-space coordinate to look at.
         * @param {Number} [ux=0] - x-component of the up vector for the look at transform.
         * @param {Number} [uy=1] - y-component of the up vector for the look at transform.
         * @param {Number} [uz=0] - z-component of the up vector for the look at transform.
         * @example
         * // Look at another entity, using the (default) positive y-axis for up
         * var position = otherEntity.getPosition();
         * this.entity.lookAt(position);
         * @example
         * // Look at another entity, using the negative world y-axis for up
         * var position = otherEntity.getPosition();
         * this.entity.lookAt(position, pc.Vec3.DOWN);
         * @example
         * // Look at the world space origin, using the (default) positive y-axis for up
         * this.entity.lookAt(0, 0, 0);
         * @example
         * // Look at world-space coordinate [10, 10, 10], using the negative world y-axis for up
         * this.entity.lookAt(10, 10, 10, 0, -1, 0);
         */
        lookAt(x: pc.Vec3 | number, y: pc.Vec3 | number, z: number, ux?: number, uy?: number, uz?: number): void;
        /**
         * @function
         * @name pc.GraphNode#translate
         * @description Translates the graph node in world-space by the specified translation vector.
         * This function has two valid signatures: you can either pass a 3D vector or 3 numbers to
         * specify the world-space translation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding world-space translation or
         * x-coordinate of world-space translation.
         * @param {Number} [y] - y-coordinate of world-space translation.
         * @param {Number} [z] - z-coordinate of world-space translation.
         * @example
         * // Translate via 3 numbers
         * this.entity.translate(10, 0, 0);
         * @example
         * // Translate via vector
         * var t = new pc.Vec3(10, 0, 0);
         * this.entity.translate(t);
         */
        translate(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#translateLocal
         * @description Translates the graph node in local-space by the specified translation vector.
         * This function has two valid signatures: you can either pass a 3D vector or 3 numbers to
         * specify the local-space translation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space translation or
         * x-coordinate of local-space translation.
         * @param {Number} [y] - y-coordinate of local-space translation.
         * @param {Number} [z] - z-coordinate of local-space translation.
         * @example
         * // Translate via 3 numbers
         * this.entity.translateLocal(10, 0, 0);
         * @example
         * // Translate via vector
         * var t = new pc.Vec3(10, 0, 0);
         * this.entity.translateLocal(t);
         */
        translateLocal(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#rotate
         * @description Rotates the graph node in world-space by the specified Euler angles.
         * Eulers are specified in degrees in XYZ order. This function has two valid signatures:
         * you can either pass a 3D vector or 3 numbers to specify the world-space rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding world-space rotation or
         * rotation around world-space x-axis in degrees.
         * @param {Number} [y] - Rotation around world-space y-axis in degrees.
         * @param {Number} [z] - Rotation around world-space z-axis in degrees.
         * @example
         * // Rotate via 3 numbers
         * this.entity.rotate(0, 90, 0);
         * @example
         * // Rotate via vector
         * var r = new pc.Vec3(0, 90, 0);
         * this.entity.rotate(r);
         */
        rotate(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#rotateLocal
         * @description Rotates the graph node in local-space by the specified Euler angles.
         * Eulers are specified in degrees in XYZ order. This function has two valid signatures:
         * you can either pass a 3D vector or 3 numbers to specify the local-space rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space rotation or
         * rotation around local-space x-axis in degrees.
         * @param {Number} [y] - Rotation around local-space y-axis in degrees.
         * @param {Number} [z] - Rotation around local-space z-axis in degrees.
         * @example
         * // Rotate via 3 numbers
         * this.entity.rotateLocal(0, 90, 0);
         * @example
         * // Rotate via vector
         * var r = new pc.Vec3(0, 90, 0);
         * this.entity.rotateLocal(r);
         */
        rotateLocal(x: pc.Vec3 | number, y?: number, z?: number): void;
    }
    /**
     * @name pc.script
     * @namespace
     * @description Functions for creating user scripts for the script component
     * @property {Boolean} legacy If True, then engine will use legacy scripting system, defaults to true (subject to change)
     */
    namespace script {
        /**
         * @function
         * @name pc.script.create
         * @description Create a script resource object. A script file should contain a single call to pc.script.create and the callback should return a script object which will be
         * instantiated when attached to Entities.
         * @param {String} name The name of the script object.
         * @param {Function} callback The callback function which is passed an {pc.Application} object,
         * which is used to access Entities and Components, and should return the Type of the script resource
         * to be instanced for each Entity.
         * @example
         * pc.script.create( function (app) {
         *  var Scriptable = function (entity) {
         *      // store entity
         *      this.entity = entity;
         *
         *      // use app
         *      app.components.model.addComponent(entity, {...});
         *  };
         *
         *  return Scriptable;
         * }
         */
        function create(name: string, callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.script.attribute
         * @description Creates a script attribute for the current script. The script attribute can be accessed
         * inside the script instance like so 'this.attributeName' or outside a script instance like so 'entity.script.attributeName'.
         * Script attributes can be edited from the Attribute Editor of the PlayCanvas Editor like normal Components.
         * @param {String} name The name of the attribute
         * @param {String} type The type of the attribute. Can be one of the following: 'number', 'string', 'boolean', 'asset', 'entity', 'rgb', 'rgba', 'vector', 'enumeration', 'curve', 'colorcurve'
         * @param {Object} defaultValue The default value of the attribute
         * @param {Object} options Optional parameters for the attribute. Valid values are:
         * <ul>
         *   <li>{Number} min: The minimum value of the attribute</li>
         *   <li>{Number} max: The maximum value of the attribute</li>
         *   <li>{Number} step: The step that will be used when changing the attribute value in the PlayCanvas Editor</li>
         *   <li>{Number} decimalPrecision: A number that specifies the number of decimal digits allowed for the value</li>
         *   <li>{Object[]} enumerations: An array of name, value pairs from which the user can select one if the attribute type is an enumeration</li>
         *   <li>{String[]} curves: (For 'curve' attributes only) An array of strings that define the names of each curve in the curve editor.</li>
         *   <li>{Boolean} color: (For 'curve' attributes only) If true then the curve attribute will be a color curve.</li>
         * </ul>
         * @example
         * pc.script.attribute('speed', 'number', 5);
         * pc.script.attribute('message', 'string', "My message");
         * pc.script.attribute('enemyPosition', 'vector', [1,0,0]);
         * pc.script.attribute('spellType', 'enumeration', 0, {
         *     enumerations: [{
         *        name: "Fire",
         *        value: 0
         *     }, {
         *        name: "Ice",
         *        value: 1
         *     }]
         *  });
         * pc.script.attribute('enemy', 'entity');
         * pc.script.attribute('enemySpeed', 'curve');
         * pc.script.attribute('enemyPosition', 'curve', null, {
         *     curves: ['x', 'y', 'z']
         * });
         * pc.script.attribute('color', 'colorcurve', null, {
         *     type: 'rgba'
         * });
         *
         * pc.script.create('scriptable', function (app) {
         *  var Scriptable = function (entity) {
         *      // store entity
         *      this.entity = entity;
         *  };
         *
         *  return Scriptable;
         * }
         */
        function attribute(name: string, type: string, defaultValue: any, options: any): void;
        /**
         * @function
         * @name pc.script.createLoadingScreen
         * @description Handles the creation of the loading screen of the application. A script can subscribe to
         * the events of a {@link pc.Application} to show a loading screen, progress bar etc. In order for this to work
         * you need to set the project's loading screen script to the script that calls this method.
         * @param  {Function} callback A function which can set up and tear down a customised loading screen.
         * @example
         * pc.script.createLoadingScreen(function (app) {
         *     var showSplashScreen = function () { // }
         *     var hideSplashScreen = function () { // }
         *     var showProgress = function (progress) { // }
         *     app.on("preload:start", showSplashScreen);
         *     app.on("preload:progress", showProgress);
         *     app.on("start", hideSplashScreen);
         * });
         */
        function createLoadingScreen(callback: (...params: any[]) => any): void;
    }
    /**
     * @constructor
     * @name pc.GraphicsDevice
     * @classdesc The graphics device manages the underlying graphics context. It is responsible
     * for submitting render state changes and graphics primitives to the hardware. A graphics
     * device is tied to a specific canvas HTML element. It is valid to have more than one
     * canvas element per page and create a new graphics device against each.
     * @description Creates a new graphics device.
     * @param {HTMLCanvasElement} canvas The canvas to which the graphics device will render.
     * @param {Object} [options] Options passed when creating the WebGL context. More info {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext here}.
     * @property {HTMLCanvasElement} canvas The canvas DOM element that provides the underlying WebGL context used by the graphics device.
     */
    class GraphicsDevice {
        constructor(canvas: HTMLCanvasElement, options?: any);
        /**
         * @readonly
         * @name pc.GraphicsDevice#precision
         * @type String
         * @description The highest shader precision supported by this graphics device. Can be 'hiphp', 'mediump' or 'lowp'.
         */
        readonly precision: string;
        /**
         * @readonly
         * @name pc.GraphicsDevice#maxCubeMapSize
         * @type Number
         * @description The maximum supported dimension of a cube map.
         */
        readonly maxCubeMapSize: number;
        /**
         * @readonly
         * @name pc.GraphicsDevice#maxTextureSize
         * @type Number
         * @description The maximum supported dimension of a texture.
         */
        readonly maxTextureSize: number;
        /**
         * @readonly
         * @name pc.GraphicsDevice#maxVolumeSize
         * @type Number
         * @description The maximum supported dimension of a 3D texture (any axis).
         */
        readonly maxVolumeSize: number;
        /**
         * @readonly
         * @name pc.GraphicsDevice#maxAnisotropy
         * @type Number
         * @description The maximum supported texture anisotropy setting.
         */
        readonly maxAnisotropy: number;
        /**
         * @function
         * @name pc.GraphicsDevice#setViewport
         * @description Set the active rectangle for rendering on the specified device.
         * @param {Number} x The pixel space x-coordinate of the bottom left corner of the viewport.
         * @param {Number} y The pixel space y-coordinate of the bottom left corner of the viewport.
         * @param {Number} w The width of the viewport in pixels.
         * @param {Number} h The height of the viewport in pixels.
         */
        setViewport(x: number, y: number, w: number, h: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setScissor
         * @description Set the active scissor rectangle on the specified device.
         * @param {Number} x The pixel space x-coordinate of the bottom left corner of the scissor rectangle.
         * @param {Number} y The pixel space y-coordinate of the bottom left corner of the scissor rectangle.
         * @param {Number} w The width of the scissor rectangle in pixels.
         * @param {Number} h The height of the scissor rectangle in pixels.
         */
        setScissor(x: number, y: number, w: number, h: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#updateBegin
         * @description Marks the beginning of a block of rendering. Internally, this function
         * binds the render target currently set on the device. This function should be matched
         * with a call to pc.GraphicsDevice#updateEnd. Calls to pc.GraphicsDevice#updateBegin
         * and pc.GraphicsDevice#updateEnd must not be nested.
         */
        updateBegin(): void;
        /**
         * @function
         * @name pc.GraphicsDevice#updateEnd
         * @description Marks the end of a block of rendering. This function should be called
         * after a matching call to pc.GraphicsDevice#updateBegin. Calls to pc.GraphicsDevice#updateBegin
         * and pc.GraphicsDevice#updateEnd must not be nested.
         */
        updateEnd(): void;
        /**
         * @function
         * @name pc.GraphicsDevice#draw
         * @description Submits a graphical primitive to the hardware for immediate rendering.
         * @param {Object} primitive Primitive object describing how to submit current vertex/index buffers defined as follows:
         * @param {Number} primitive.type The type of primitive to render. Can be:
         * <ul>
         *     <li>pc.PRIMITIVE_POINTS</li>
         *     <li>pc.PRIMITIVE_LINES</li>
         *     <li>pc.PRIMITIVE_LINELOOP</li>
         *     <li>pc.PRIMITIVE_LINESTRIP</li>
         *     <li>pc.PRIMITIVE_TRIANGLES</li>
         *     <li>pc.PRIMITIVE_TRISTRIP</li>
         *     <li>pc.PRIMITIVE_TRIFAN</li>
         * </ul>
         * @param {Number} primitive.base The offset of the first index or vertex to dispatch in the draw call.
         * @param {Number} primitive.count The number of indices or vertices to dispatch in the draw call.
         * @param {Boolean} primitive.indexed True to interpret the primitive as indexed, thereby using the currently set index buffer and false otherwise.
         * @param {Number} [numInstances=1] The number of instances to render when using ANGLE_instanced_arrays. Defaults to 1.
         * @example
         * // Render a single, unindexed triangle
         * device.draw({
         *     type: pc.PRIMITIVE_TRIANGLES,
         *     base: 0,
         *     count: 3,
         *     indexed: false
         * )};
         */
        draw(primitive: {
            type: number;
            base: number;
            count: number;
            indexed: boolean;
        }, numInstances?: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#clear
         * @description Clears the frame buffer of the currently set render target.
         * @param {Object} options Optional options object that controls the behavior of the clear operation defined as follows:
         * @param {Number[]} options.color The color to clear the color buffer to in the range 0.0 to 1.0 for each component.
         * @param {Number} options.depth The depth value to clear the depth buffer to in the range 0.0 to 1.0.
         * @param {Number} options.flags The buffers to clear (the types being color, depth and stencil). Can be any bitwise
         * combination of:
         * <ul>
         *     <li>pc.CLEARFLAG_COLOR</li>
         *     <li>pc.CLEARFLAG_DEPTH</li>
         *     <li>pc.CLEARFLAG_STENCIL</li>
         * </ul>
         * @example
         * // Clear color buffer to black and depth buffer to 1.0
         * device.clear();
         *
         * // Clear just the color buffer to red
         * device.clear({
         *     color: [1, 0, 0, 1],
         *     flags: pc.CLEARFLAG_COLOR
         * });
         *
         * // Clear color buffer to yellow and depth to 1.0
         * device.clear({
         *     color: [1, 1, 0, 1],
         *     depth: 1.0,
         *     flags: pc.CLEARFLAG_COLOR | pc.CLEARFLAG_DEPTH
         * });
         */
        clear(options: {
            color: Number[];
            depth: number;
            flags: number;
        }): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setRenderTarget
         * @description Sets the specified render target on the device. If null
         * is passed as a parameter, the back buffer becomes the current target
         * for all rendering operations.
         * @param {pc.RenderTarget} renderTarget The render target to activate.
         * @example
         * // Set a render target to receive all rendering output
         * device.setRenderTarget(renderTarget);
         *
         * // Set the back buffer to receive all rendering output
         * device.setRenderTarget(null);
         */
        setRenderTarget(renderTarget: pc.RenderTarget): void;
        /**
         * @function
         * @name pc.GraphicsDevice#getRenderTarget
         * @description Queries the currently set render target on the device.
         * @returns {pc.RenderTarget} The current render target.
         * @example
         * // Get the current render target
         * var renderTarget = device.getRenderTarget();
         */
        getRenderTarget(): pc.RenderTarget;
        /**
         * @function
         * @name pc.GraphicsDevice#getDepthTest
         * @description Queries whether depth testing is enabled.
         * @returns {Boolean} true if depth testing is enabled and false otherwise.
         * @example
         * var depthTest = device.getDepthTest();
         * console.log('Depth testing is ' + depthTest ? 'enabled' : 'disabled');
         */
        getDepthTest(): boolean;
        /**
         * @function
         * @name pc.GraphicsDevice#setDepthTest
         * @description Enables or disables depth testing of fragments. Once this state
         * is set, it persists until it is changed. By default, depth testing is enabled.
         * @param {Boolean} depthTest true to enable depth testing and false otherwise.
         * @example
         * device.setDepthTest(true);
         */
        setDepthTest(depthTest: boolean): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setDepthFunc
         * @description Configures the depth test.
         * @param {Number} func A function to compare a new depth value with an existing z-buffer value and decide if to write a pixel. Can be:
         * <ul>
         *     <li>pc.FUNC_NEVER: don't draw</li>
         *     <li>pc.FUNC_LESS: draw if new depth < depth buffer</li>
         *     <li>pc.FUNC_EQUAL: draw if new depth == depth buffer</li>
         *     <li>pc.FUNC_LESSEQUAL: draw if new depth <= depth buffer</li>
         *     <li>pc.FUNC_GREATER: draw if new depth > depth buffer</li>
         *     <li>pc.FUNC_NOTEQUAL: draw if new depth != depth buffer</li>
         *     <li>pc.FUNC_GREATEREQUAL: draw if new depth >= depth buffer</li>
         *     <li>pc.FUNC_ALWAYS: always draw</li>
         * </ul>
         */
        setDepthFunc(func: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#getDepthWrite
         * @description Queries whether writes to the depth buffer are enabled.
         * @returns {Boolean} true if depth writing is enabled and false otherwise.
         * @example
         * var depthWrite = device.getDepthWrite();
         * console.log('Depth writing is ' + depthWrite ? 'enabled' : 'disabled');
         */
        getDepthWrite(): boolean;
        /**
         * @function
         * @name pc.GraphicsDevice#setDepthWrite
         * @description Enables or disables writes to the depth buffer. Once this state
         * is set, it persists until it is changed. By default, depth writes are enabled.
         * @param {Boolean} writeDepth true to enable depth writing and false otherwise.
         * @example
         * device.setDepthWrite(true);
         */
        setDepthWrite(writeDepth: boolean): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setColorWrite
         * @description Enables or disables writes to the color buffer. Once this state
         * is set, it persists until it is changed. By default, color writes are enabled
         * for all color channels.
         * @param {Boolean} writeRed true to enable writing of the red channel and false otherwise.
         * @param {Boolean} writeGreen true to enable writing of the green channel and false otherwise.
         * @param {Boolean} writeBlue true to enable writing of the blue channel and false otherwise.
         * @param {Boolean} writeAlpha true to enable writing of the alpha channel and false otherwise.
         * @example
         * // Just write alpha into the frame buffer
         * device.setColorWrite(false, false, false, true);
         */
        setColorWrite(writeRed: boolean, writeGreen: boolean, writeBlue: boolean, writeAlpha: boolean): void;
        /**
         * @function
         * @name pc.GraphicsDevice#getBlending
         * @description Queries whether blending is enabled.
         * @returns {Boolean} True if blending is enabled and false otherwise.
         */
        getBlending(): boolean;
        /**
         * @function
         * @name pc.GraphicsDevice#setBlending
         * @description Enables or disables blending.
         * @param {Boolean} blending True to enable blending and false to disable it.
         */
        setBlending(blending: boolean): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setStencilTest
         * @description Enables or disables stencil test.
         * @param {Boolean} enable True to enable stencil test and false to disable it.
         */
        setStencilTest(enable: boolean): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setStencilFunc
         * @description Configures stencil test for both front and back faces.
         * @param {Number} func A comparison function that decides if the pixel should be written, based on the current stencil buffer value,
         * reference value, and mask value. Can be:
         * <ul>
         *     <li>pc.FUNC_NEVER: never pass</li>
         *     <li>pc.FUNC_LESS: pass if (ref & mask) < (stencil & mask)</li>
         *     <li>pc.FUNC_EQUAL: pass if (ref & mask) == (stencil & mask)</li>
         *     <li>pc.FUNC_LESSEQUAL: pass if (ref & mask) <= (stencil & mask)</li>
         *     <li>pc.FUNC_GREATER: pass if (ref & mask) > (stencil & mask)</li>
         *     <li>pc.FUNC_NOTEQUAL: pass if (ref & mask) != (stencil & mask)</li>
         *     <li>pc.FUNC_GREATEREQUAL: pass if (ref & mask) >= (stencil & mask)</li>
         *     <li>pc.FUNC_ALWAYS: always pass</li>
         * </ul>
         * @param {Number} ref Reference value used in comparison.
         * @param {Number} mask Mask applied to stencil buffer value and reference value before comparison.
         */
        setStencilFunc(func: number, ref: number, mask: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setStencilFuncFront
         * @description Configures stencil test for front faces.
         * @param {Number} func A comparison function that decides if the pixel should be written,
         * based on the current stencil buffer value, reference value, and mask value. Can be:
         * <ul>
         *     <li>pc.FUNC_NEVER: never pass</li>
         *     <li>pc.FUNC_LESS: pass if (ref & mask) < (stencil & mask)</li>
         *     <li>pc.FUNC_EQUAL: pass if (ref & mask) == (stencil & mask)</li>
         *     <li>pc.FUNC_LESSEQUAL: pass if (ref & mask) <= (stencil & mask)</li>
         *     <li>pc.FUNC_GREATER: pass if (ref & mask) > (stencil & mask)</li>
         *     <li>pc.FUNC_NOTEQUAL: pass if (ref & mask) != (stencil & mask)</li>
         *     <li>pc.FUNC_GREATEREQUAL: pass if (ref & mask) >= (stencil & mask)</li>
         *     <li>pc.FUNC_ALWAYS: always pass</li>
         * </ul>
         * @param {Number} ref Reference value used in comparison.
         * @param {Number} mask Mask applied to stencil buffer value and reference value before comparison.
         */
        setStencilFuncFront(func: number, ref: number, mask: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setStencilFuncBack
         * @description Configures stencil test for back faces.
         * @param {Number} func A comparison function that decides if the pixel should be written,
         * based on the current stencil buffer value, reference value, and mask value. Can be:
         * <ul>
         *     <li>pc.FUNC_NEVER: never pass</li>
         *     <li>pc.FUNC_LESS: pass if (ref & mask) < (stencil & mask)</li>
         *     <li>pc.FUNC_EQUAL: pass if (ref & mask) == (stencil & mask)</li>
         *     <li>pc.FUNC_LESSEQUAL: pass if (ref & mask) <= (stencil & mask)</li>
         *     <li>pc.FUNC_GREATER: pass if (ref & mask) > (stencil & mask)</li>
         *     <li>pc.FUNC_NOTEQUAL: pass if (ref & mask) != (stencil & mask)</li>
         *     <li>pc.FUNC_GREATEREQUAL: pass if (ref & mask) >= (stencil & mask)</li>
         *     <li>pc.FUNC_ALWAYS: always pass</li>
         * </ul>
         * @param {Number} ref Reference value used in comparison.
         * @param {Number} mask Mask applied to stencil buffer value and reference value before comparison.
         */
        setStencilFuncBack(func: number, ref: number, mask: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setStencilOperation
         * @description Configures how stencil buffer values should be modified based on the result
         * of depth/stencil tests. Works for both front and back faces.
         * @param {Number} fail Action to take if stencil test is failed
         * @param {Number} zfail Action to take if depth test is failed
         * @param {Number} zpass Action to take if both depth and stencil test are passed
         * All arguments can be:
         * <ul>
         *     <li>pc.STENCILOP_KEEP: don't change the stencil buffer value</li>
         *     <li>pc.STENCILOP_ZERO: set value to zero</li>
         *     <li>pc.STENCILOP_REPLACE: replace value with the reference value (see {@link pc.GraphicsDevice#setStencilFunc})</li>
         *     <li>pc.STENCILOP_INCREMENT: increment the value</li>
         *     <li>pc.STENCILOP_INCREMENTWRAP: increment the value, but wrap it to zero when it's larger than a maximum representable value</li>
         *     <li>pc.STENCILOP_DECREMENT: decrement the value</li>
         *     <li>pc.STENCILOP_DECREMENTWRAP: decrement the value, but wrap it to a maximum representable value, if the current value is 0</li>
         *     <li>pc.STENCILOP_INVERT: invert the value bitwise</li>
         * </ul>
         * @param {Number} writeMask A bit mask applied to the reference value, when written.
         */
        setStencilOperation(fail: number, zfail: number, zpass: number, writeMask: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setStencilOperationFront
         * @description Configures how stencil buffer values should be modified based on the result
         * of depth/stencil tests. Works for front faces.
         * @param {Number} fail Action to take if stencil test is failed
         * @param {Number} zfail Action to take if depth test is failed
         * @param {Number} zpass Action to take if both depth and stencil test are passed
         * All arguments can be:
         * <ul>
         *     <li>pc.STENCILOP_KEEP: don't change the stencil buffer value</li>
         *     <li>pc.STENCILOP_ZERO: set value to zero</li>
         *     <li>pc.STENCILOP_REPLACE: replace value with the reference value (see {@link pc.GraphicsDevice#setStencilFunc})</li>
         *     <li>pc.STENCILOP_INCREMENT: increment the value</li>
         *     <li>pc.STENCILOP_INCREMENTWRAP: increment the value, but wrap it to zero when it's larger than a maximum representable value</li>
         *     <li>pc.STENCILOP_DECREMENT: decrement the value</li>
         *     <li>pc.STENCILOP_DECREMENTWRAP: decrement the value, but wrap it to a maximum representable value, if the current value is 0</li>
         *     <li>pc.STENCILOP_INVERT: invert the value bitwise</li>
         * </ul>
         * @param {Number} writeMask A bit mask applied to the reference value, when written.
         */
        setStencilOperationFront(fail: number, zfail: number, zpass: number, writeMask: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setStencilOperationBack
         * @description Configures how stencil buffer values should be modified based on the result
         * of depth/stencil tests. Works for back faces.
         * @param {Number} fail Action to take if stencil test is failed
         * @param {Number} zfail Action to take if depth test is failed
         * @param {Number} zpass Action to take if both depth and stencil test are passed
         * All arguments can be:
         * <ul>
         *     <li>pc.STENCILOP_KEEP: don't change the stencil buffer value</li>
         *     <li>pc.STENCILOP_ZERO: set value to zero</li>
         *     <li>pc.STENCILOP_REPLACE: replace value with the reference value (see {@link pc.GraphicsDevice#setStencilFunc})</li>
         *     <li>pc.STENCILOP_INCREMENT: increment the value</li>
         *     <li>pc.STENCILOP_INCREMENTWRAP: increment the value, but wrap it to zero when it's larger than a maximum representable value</li>
         *     <li>pc.STENCILOP_DECREMENT: decrement the value</li>
         *     <li>pc.STENCILOP_DECREMENTWRAP: decrement the value, but wrap it to a maximum representable value, if the current value is 0</li>
         *     <li>pc.STENCILOP_INVERT: invert the value bitwise</li>
         * </ul>
         * @param {Number} writeMask A bit mask applied to the reference value, when written.
         */
        setStencilOperationBack(fail: number, zfail: number, zpass: number, writeMask: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setBlendFunction
         * @description Configures blending operations. Both source and destination
         * blend modes can take the following values:
         * <ul>
         *     <li>pc.BLENDMODE_ZERO</li>
         *     <li>pc.BLENDMODE_ONE</li>
         *     <li>pc.BLENDMODE_SRC_COLOR</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_SRC_COLOR</li>
         *     <li>pc.BLENDMODE_DST_COLOR</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_DST_COLOR</li>
         *     <li>pc.BLENDMODE_SRC_ALPHA</li>
         *     <li>pc.BLENDMODE_SRC_ALPHA_SATURATE</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_SRC_ALPHA</li>
         *     <li>pc.BLENDMODE_DST_ALPHA</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_DST_ALPHA</li>
         * </ul>
         * @param {Number} blendSrc The source blend function.
         * @param {Number} blendDst The destination blend function.
         */
        setBlendFunction(blendSrc: number, blendDst: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setBlendFunctionSeparate
         * @description Configures blending operations. Both source and destination
         * blend modes can take the following values:
         * <ul>
         *     <li>pc.BLENDMODE_ZERO</li>
         *     <li>pc.BLENDMODE_ONE</li>
         *     <li>pc.BLENDMODE_SRC_COLOR</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_SRC_COLOR</li>
         *     <li>pc.BLENDMODE_DST_COLOR</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_DST_COLOR</li>
         *     <li>pc.BLENDMODE_SRC_ALPHA</li>
         *     <li>pc.BLENDMODE_SRC_ALPHA_SATURATE</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_SRC_ALPHA</li>
         *     <li>pc.BLENDMODE_DST_ALPHA</li>
         *     <li>pc.BLENDMODE_ONE_MINUS_DST_ALPHA</li>
         * </ul>
         * @param {Number} blendSrc The source blend function.
         * @param {Number} blendDst The destination blend function.
         * @param {Number} blendSrcAlpha The separate source blend function for the alpha channel.
         * @param {Number} blendDstAlpha The separate destination blend function for the alpha channel.
         */
        setBlendFunctionSeparate(blendSrc: number, blendDst: number, blendSrcAlpha: number, blendDstAlpha: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setBlendEquation
         * @description Configures the blending equation. The default blend equation is
         * pc.BLENDEQUATION_ADD.
         * @param {Number} blendEquation The blend equation. Can be:
         * <ul>
         *     <li>pc.BLENDEQUATION_ADD</li>
         *     <li>pc.BLENDEQUATION_SUBTRACT</li>
         *     <li>pc.BLENDEQUATION_REVERSE_SUBTRACT</li>
         *     <li>pc.BLENDEQUATION_MIN</li>
         *     <li>pc.BLENDEQUATION_MAX</li>
         * Note that MIN and MAX modes require either EXT_blend_minmax or WebGL2 to work (check device.extBlendMinmax).
         * </ul>
         */
        setBlendEquation(blendEquation: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setBlendEquationSeparate
         * @description Configures the blending equation. The default blend equation is
         * pc.BLENDEQUATION_ADD.
         * @param {Number} blendEquation The blend equation. Can be:
         * <ul>
         *     <li>pc.BLENDEQUATION_ADD</li>
         *     <li>pc.BLENDEQUATION_SUBTRACT</li>
         *     <li>pc.BLENDEQUATION_REVERSE_SUBTRACT</li>
         *     <li>pc.BLENDEQUATION_MIN</li>
         *     <li>pc.BLENDEQUATION_MAX</li>
         * Note that MIN and MAX modes require either EXT_blend_minmax or WebGL2 to work (check device.extBlendMinmax).
         * @param {Number} blendAlphaEquation A separate blend equation for the alpha channel. Accepts same values as blendEquation.
         * </ul>
         */
        setBlendEquationSeparate(blendEquation: number, blendAlphaEquation: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setCullMode
         * @description Controls how triangles are culled based on their face direction.
         * The default cull mode is pc.CULLFACE_BACK.
         * @param {Number} cullMode The cull mode to set. Can be:
         * <ul>
         *     <li>pc.CULLFACE_NONE</li>
         *     <li>pc.CULLFACE_BACK</li>
         *     <li>pc.CULLFACE_FRONT</li>
         *     <li>pc.CULLFACE_FRONTANDBACK</li>
         * </ul>
         */
        setCullMode(cullMode: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setIndexBuffer
         * @description Sets the current index buffer on the graphics device. On subsequent
         * calls to pc.GraphicsDevice#draw, the specified index buffer will be used to provide
         * index data for any indexed primitives.
         * @param {pc.IndexBuffer} indexBuffer The index buffer to assign to the device.
         */
        setIndexBuffer(indexBuffer: pc.IndexBuffer): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setVertexBuffer
         * @description Sets the current vertex buffer for a specific stream index on the graphics
         * device. On subsequent calls to pc.GraphicsDevice#draw, the specified vertex buffer will be
         * used to provide vertex data for any primitives.
         * @param {pc.VertexBuffer} vertexBuffer The vertex buffer to assign to the device.
         * @param {Number} stream The stream index for the vertex buffer, indexed from 0 upwards.
         * @param {Number} [vbOffset=0] The byte offset into the vertex buffer data. Defaults to 0.
         */
        setVertexBuffer(vertexBuffer: pc.VertexBuffer, stream: number, vbOffset?: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#setShader
         * @description Sets the active shader to be used during subsequent draw calls.
         * @param {pc.Shader} shader The shader to set to assign to the device.
         * @returns {Boolean} true if the shader was successfully set, false otherwise.
         */
        setShader(shader: pc.Shader): boolean;
        /**
         * @function
         * @name pc.GraphicsDevice#resizeCanvas
         * @description Sets the width and height of the canvas, then fires the 'resizecanvas' event.
         * Note that the specified width and height values will be multiplied by the value of
         * {@link pc.GraphicsDevice#maxPixelRatio} to give the final resultant width and height for
         * the canvas.
         * @param {Number} width The new width of the canvas.
         * @param {Number} height The new height of the canvas.
         */
        resizeCanvas(width: number, height: number): void;
        /**
         * @function
         * @name pc.GraphicsDevice#clearShaderCache
         * @description Frees memory from all shaders ever allocated with this device
         */
        clearShaderCache(): void;
        /**
         * @readonly
         * @name pc.GraphicsDevice#width
         * @type Number
         * @description Width of the back buffer in pixels.
         */
        readonly width: number;
        /**
         * @readonly
         * @name pc.GraphicsDevice#height
         * @type Number
         * @description Height of the back buffer in pixels.
         */
        readonly height: number;
    }
    /**
     * @static
     * @readonly
     * @type Number
     * @name pc.ADDRESS_REPEAT
     * @description Ignores the integer part of texture coordinates, using only the fractional part.
     */
    var ADDRESS_REPEAT: number;
    /**
     * @static
     * @readonly
     * @type Number
     * @name pc.ADDRESS_CLAMP_TO_EDGE
     * @description Clamps texture coordinate to the range 0 to 1.
     */
    var ADDRESS_CLAMP_TO_EDGE: number;
    /**
     * @static
     * @readonly
     * @type Number
     * @name pc.ADDRESS_MIRRORED_REPEAT
     * @description Texture coordinate to be set to the fractional part if the integer part is even; if the integer part is odd,
     * then the texture coordinate is set to 1 minus the fractional part.
     */
    var ADDRESS_MIRRORED_REPEAT: number;
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_ZERO
     * @description Multiply all fragment components by zero.
     */
    enum BLENDMODE_ZERO {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_ONE
     * @description Multiply all fragment components by one.
     */
    enum BLENDMODE_ONE {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_SRC_COLOR
     * @description Multiply all fragment components by the components of the source fragment.
     */
    enum BLENDMODE_SRC_COLOR {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_ONE_MINUS_SRC_COLOR
     * @description Multiply all fragment components by one minus the components of the source fragment.
     */
    enum BLENDMODE_ONE_MINUS_SRC_COLOR {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_DST_COLOR
     * @description Multiply all fragment components by the components of the destination fragment.
     */
    enum BLENDMODE_DST_COLOR {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_ONE_MINUS_DST_COLOR
     * @description Multiply all fragment components by one minus the components of the destination fragment.
     */
    enum BLENDMODE_ONE_MINUS_DST_COLOR {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_SRC_ALPHA
     * @description Multiply all fragment components by the alpha value of the source fragment.
     */
    enum BLENDMODE_SRC_ALPHA {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_SRC_ALPHA_SATURATE
     * @description Multiply all fragment components by the alpha value of the source fragment.
     */
    enum BLENDMODE_SRC_ALPHA_SATURATE {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_ONE_MINUS_SRC_ALPHA
     * @description Multiply all fragment components by one minus the alpha value of the source fragment.
     */
    enum BLENDMODE_ONE_MINUS_SRC_ALPHA {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_DST_ALPHA
     * @description Multiply all fragment components by the alpha value of the destination fragment.
     */
    enum BLENDMODE_DST_ALPHA {
    }
    /**
     * @enum pc.BLENDMODE
     * @name pc.BLENDMODE_ONE_MINUS_DST_ALPHA
     * @description Multiply all fragment components by one minus the alpha value of the destination fragment.
     */
    enum BLENDMODE_ONE_MINUS_DST_ALPHA {
    }
    /**
     * @enum pc.BLENDEQUATION
     * @name pc.BLENDEQUATION_ADD
     * @description Add the results of the source and destination fragment multiplies.
     */
    enum BLENDEQUATION_ADD {
    }
    /**
     * @enum pc.BLENDEQUATION
     * @name pc.BLENDEQUATION_SUBTRACT
     * @description Subtract the results of the source and destination fragment multiplies.
     */
    enum BLENDEQUATION_SUBTRACT {
    }
    /**
     * @enum pc.BLENDEQUATION
     * @name pc.BLENDEQUATION_REVERSE_SUBTRACT
     * @description Reverse and subtract the results of the source and destination fragment multiplies.
     */
    enum BLENDEQUATION_REVERSE_SUBTRACT {
    }
    /**
     * @enum pc.BLENDEQUATION
     * @name pc.BLENDEQUATION_MIN
     * @description Use the smallest value. Check app.graphicsDevice.extBlendMinmax for support.
     */
    enum BLENDEQUATION_MIN {
    }
    /**
     * @enum pc.BLENDEQUATION
     * @name pc.BLENDEQUATION_MAX
     * @description Use the largest value. Check app.graphicsDevice.extBlendMinmax for support.
     */
    enum BLENDEQUATION_MAX {
    }
    /**
     * @enum pc.BUFFER
     * @name pc.BUFFER_STATIC
     * @description The data store contents will be modified once and used many times.
     */
    enum BUFFER_STATIC {
    }
    /**
     * @enum pc.BUFFER
     * @name pc.BUFFER_DYNAMIC
     * @description The data store contents will be modified repeatedly and used many times.
     */
    enum BUFFER_DYNAMIC {
    }
    /**
     * @enum pc.BUFFER
     * @name pc.BUFFER_STREAM
     * @description The data store contents will be modified once and used at most a few times.
     */
    enum BUFFER_STREAM {
    }
    /**
     * @enum pc.BUFFER
     * @name pc.BUFFER_GPUDYNAMIC
     * @description The data store contents will be modified repeatedly on the GPU and used many times. Optimal for transform feedback usage (WebGL2 only).
     */
    enum BUFFER_GPUDYNAMIC {
    }
    /**
     * @enum pc.CLEARFLAG
     * @name pc.CLEARFLAG_COLOR
     * @description Clear the color buffer.
     */
    enum CLEARFLAG_COLOR {
    }
    /**
     * @enum pc.CLEARFLAG
     * @name pc.CLEARFLAG_DEPTH
     * @description Clear the depth buffer.
     */
    enum CLEARFLAG_DEPTH {
    }
    /**
     * @enum pc.CLEARFLAG
     * @name pc.CLEARFLAG_STENCIL
     * @description Clear the stencil buffer.
     */
    enum CLEARFLAG_STENCIL {
    }
    /**
     * @enum pc.CUBEFACE
     * @name pc.CUBEFACE_POSX
     * @description The positive X face of a cubemap.
     */
    enum CUBEFACE_POSX {
    }
    /**
     * @enum pc.CUBEFACE
     * @name pc.CUBEFACE_NEGX
     * @description The negative X face of a cubemap.
     */
    enum CUBEFACE_NEGX {
    }
    /**
     * @enum pc.CUBEFACE
     * @name pc.CUBEFACE_POSY
     * @description The positive Y face of a cubemap.
     */
    enum CUBEFACE_POSY {
    }
    /**
     * @enum pc.CUBEFACE
     * @name pc.CUBEFACE_NEGY
     * @description The negative Y face of a cubemap.
     */
    enum CUBEFACE_NEGY {
    }
    /**
     * @enum pc.CUBEFACE
     * @name pc.CUBEFACE_POSZ
     * @description The positive Z face of a cubemap.
     */
    enum CUBEFACE_POSZ {
    }
    /**
     * @enum pc.CUBEFACE
     * @name pc.CUBEFACE_NEGZ
     * @description The negative Z face of a cubemap.
     */
    enum CUBEFACE_NEGZ {
    }
    /**
     * @enum pc.CULLFACE
     * @name pc.CULLFACE_NONE
     * @description No triangles are culled.
     */
    enum CULLFACE_NONE {
    }
    /**
     * @enum pc.CULLFACE
     * @name pc.CULLFACE_BACK
     * @description Triangles facing away from the view direction are culled.
     */
    enum CULLFACE_BACK {
    }
    /**
     * @enum pc.CULLFACE
     * @name pc.CULLFACE_FRONT
     * @description Triangles facing the view direction are culled.
     */
    enum CULLFACE_FRONT {
    }
    /**
     * @enum pc.CULLFACE
     * @name pc.CULLFACE_FRONTANDBACK
     * @description Triangles are culled regardless of their orientation with respect to the view
     * direction. Note that point or line primitives are unaffected by this render state.
     */
    enum CULLFACE_FRONTANDBACK {
    }
    /**
     * @enum pc.TYPE
     * @name pc.TYPE_INT8
     * @description Signed byte vertex element type.
     */
    enum TYPE_INT8 {
    }
    /**
     * @enum pc.TYPE
     * @name pc.TYPE_UINT8
     * @description Unsigned byte vertex element type.
     */
    enum TYPE_UINT8 {
    }
    /**
     * @enum pc.TYPE
     * @name pc.TYPE_INT16
     * @description Signed short vertex element type.
     */
    enum TYPE_INT16 {
    }
    /**
     * @enum pc.TYPE
     * @name pc.TYPE_UINT16
     * @description Unsigned short vertex element type.
     */
    enum TYPE_UINT16 {
    }
    /**
     * @enum pc.TYPE
     * @name pc.TYPE_INT32
     * @description Signed integer vertex element type.
     */
    enum TYPE_INT32 {
    }
    /**
     * @enum pc.TYPE
     * @name pc.TYPE_UINT32
     * @description Unsigned integer vertex element type.
     */
    enum TYPE_UINT32 {
    }
    /**
     * @enum pc.TYPE
     * @name pc.TYPE_FLOAT32
     * @description Floating point vertex element type.
     */
    enum TYPE_FLOAT32 {
    }
    /**
     * @enum pc.FILTER
     * @name pc.FILTER_NEAREST
     * @description Point sample filtering.
     */
    enum FILTER_NEAREST {
    }
    /**
     * @enum pc.FILTER
     * @name pc.FILTER_LINEAR
     * @description Bilinear filtering.
     */
    enum FILTER_LINEAR {
    }
    /**
     * @enum pc.FILTER
     * @name pc.FILTER_NEAREST_MIPMAP_NEAREST
     * @description Use the nearest neighbor in the nearest mipmap level.
     */
    enum FILTER_NEAREST_MIPMAP_NEAREST {
    }
    /**
     * @enum pc.FILTER
     * @name pc.FILTER_NEAREST_MIPMAP_LINEAR
     * @description Linearly interpolate in the nearest mipmap level.
     */
    enum FILTER_NEAREST_MIPMAP_LINEAR {
    }
    /**
     * @enum pc.FILTER
     * @name pc.FILTER_LINEAR_MIPMAP_NEAREST
     * @description Use the nearest neighbor after linearly interpolating between mipmap levels.
     */
    enum FILTER_LINEAR_MIPMAP_NEAREST {
    }
    /**
     * @enum pc.FILTER
     * @name pc.FILTER_LINEAR_MIPMAP_LINEAR
     * @description Linearly interpolate both the mipmap levels and between texels.
     */
    enum FILTER_LINEAR_MIPMAP_LINEAR {
    }
    /**
     * @enum pc.INDEXFORMAT
     * @name pc.INDEXFORMAT_UINT8
     * @description 8-bit unsigned vertex indices.
     */
    enum INDEXFORMAT_UINT8 {
    }
    /**
     * @enum pc.INDEXFORMAT
     * @name pc.INDEXFORMAT_UINT16
     * @description 16-bit unsigned vertex indices.
     */
    enum INDEXFORMAT_UINT16 {
    }
    /**
     * @enum pc.INDEXFORMAT
     * @name pc.INDEXFORMAT_UINT32
     * @description 32-bit unsigned vertex indices.
     */
    enum INDEXFORMAT_UINT32 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_A8
     * @description 8-bit alpha.
     */
    enum PIXELFORMAT_A8 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_L8
     * @description 8-bit luminance.
     */
    enum PIXELFORMAT_L8 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_L8_A8
     * @description 8-bit luminance with 8-bit alpha.
     */
    enum PIXELFORMAT_L8_A8 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_R5_G6_B5
     * @description 16-bit RGB (5-bits for red channel, 6 for green and 5 for blue).
     */
    enum PIXELFORMAT_R5_G6_B5 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_R5_G5_B5_A1
     * @description 16-bit RGBA (5-bits for red channel, 5 for green, 5 for blue with 1-bit alpha).
     */
    enum PIXELFORMAT_R5_G5_B5_A1 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_R4_G4_B4_A4
     * @description 16-bit RGBA (4-bits for red channel, 4 for green, 4 for blue with 4-bit alpha).
     */
    enum PIXELFORMAT_R4_G4_B4_A4 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_R8_G8_B8
     * @description 24-bit RGB (8-bits for red channel, 8 for green and 8 for blue).
     */
    enum PIXELFORMAT_R8_G8_B8 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_R8_G8_B8_A8
     * @description 32-bit RGBA (8-bits for red channel, 8 for green, 8 for blue with 8-bit alpha).
     */
    enum PIXELFORMAT_R8_G8_B8_A8 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_DXT1
     * @description Block compressed format, storing 16 input pixels in 64 bits of output, consisting of two 16-bit RGB 5:6:5 color values and a 4x4 two bit lookup table.
     */
    enum PIXELFORMAT_DXT1 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_DXT3
     * @description Block compressed format, storing 16 input pixels (corresponding to a 4x4 pixel block) into 128 bits of output, consisting of 64 bits of alpha channel data (4 bits for each pixel) followed by 64 bits of color data, encoded the same way as DXT1.
     */
    enum PIXELFORMAT_DXT3 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_DXT5
     * @description Block compressed format, storing 16 input pixels into 128 bits of output, consisting of 64 bits of alpha channel data (two 8 bit alpha values and a 4x4 3 bit lookup table) followed by 64 bits of color data (encoded the same way as DXT1).
     */
    enum PIXELFORMAT_DXT5 {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_RGB16F
     * @description 16-bit floating point RGB (16-bit float for each red, green and blue channels).
     */
    enum PIXELFORMAT_RGB16F {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_RGBA16F
     * @description 16-bit floating point RGBA (16-bit float for each red, green, blue and alpha channels).
     */
    enum PIXELFORMAT_RGBA16F {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_RGB32F
     * @description 32-bit floating point RGB (32-bit float for each red, green and blue channels).
     */
    enum PIXELFORMAT_RGB32F {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_RGBA32F
     * @description 32-bit floating point RGBA (32-bit float for each red, green, blue and alpha channels).
     */
    enum PIXELFORMAT_RGBA32F {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_R32F
     * @description 32-bit floating point single channel format (WebGL2 only).
     */
    enum PIXELFORMAT_R32F {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_DEPTH
     * @description A readable depth buffer format
     */
    enum PIXELFORMAT_DEPTH {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_DEPTHSTENCIL
     * @description A readable depth/stencil buffer format (WebGL2 only).
     */
    enum PIXELFORMAT_DEPTHSTENCIL {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_111110F
     * @description A floating-point color-only format with 11 bits for red and green channels, and 10 bits for the blue channel (WebGL2 only).
     */
    enum PIXELFORMAT_111110F {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_SRGB
     * @description Color-only sRGB format (WebGL2 only).
     */
    enum PIXELFORMAT_SRGB {
    }
    /**
     * @enum pc.PIXELFORMAT
     * @name pc.PIXELFORMAT_SRGBA
     * @description Color sRGB format with additional alpha channel (WebGL2 only).
     */
    enum PIXELFORMAT_SRGBA {
    }
    /**
     * @enum pc.PRIMITIVE
     * @name pc.PRIMITIVE_POINTS
     * @description List of distinct points.
     */
    enum PRIMITIVE_POINTS {
    }
    /**
     * @enum pc.PRIMITIVE
     * @name pc.PRIMITIVE_LINES
     * @description Discrete list of line segments.
     */
    enum PRIMITIVE_LINES {
    }
    /**
     * @enum pc.PRIMITIVE
     * @name pc.PRIMITIVE_LINELOOP
     * @description List of points that are linked sequentially by line segments, with a closing line segment between the last and first points.
     */
    enum PRIMITIVE_LINELOOP {
    }
    /**
     * @enum pc.PRIMITIVE
     * @name pc.PRIMITIVE_LINESTRIP
     * @description List of points that are linked sequentially by line segments.
     */
    enum PRIMITIVE_LINESTRIP {
    }
    /**
     * @enum pc.PRIMITIVE
     * @name pc.PRIMITIVE_TRIANGLES
     * @description Discrete list of triangles.
     */
    enum PRIMITIVE_TRIANGLES {
    }
    /**
     * @enum pc.PRIMITIVE
     * @name pc.PRIMITIVE_TRISTRIP
     * @description Connected strip of triangles where a specified vertex forms a triangle using the previous two.
     */
    enum PRIMITIVE_TRISTRIP {
    }
    /**
     * @enum pc.PRIMITIVE
     * @name pc.PRIMITIVE_TRIFAN
     * @description Connected fan of triangles where the first vertex forms triangles with the following pairs of vertices.
     */
    enum PRIMITIVE_TRIFAN {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_POSITION
     * @description Vertex attribute to be treated as a position.
     */
    enum SEMANTIC_POSITION {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_NORMAL
     * @description Vertex attribute to be treated as a normal.
     */
    enum SEMANTIC_NORMAL {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TANGENT
     * @description Vertex attribute to be treated as a tangent.
     */
    enum SEMANTIC_TANGENT {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_BLENDWEIGHT
     * @description Vertex attribute to be treated as skin blend weights.
     */
    enum SEMANTIC_BLENDWEIGHT {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_BLENDINDICES
     * @description Vertex attribute to be treated as skin blend indices.
     */
    enum SEMANTIC_BLENDINDICES {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_COLOR
     * @description Vertex attribute to be treated as a color.
     */
    enum SEMANTIC_COLOR {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD0
     * @description Vertex attribute to be treated as a texture coordinate (set 0).
     */
    enum SEMANTIC_TEXCOORD0 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD1
     * @description Vertex attribute to be treated as a texture coordinate (set 1).
     */
    enum SEMANTIC_TEXCOORD1 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD2
     * @description Vertex attribute to be treated as a texture coordinate (set 2).
     */
    enum SEMANTIC_TEXCOORD2 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD3
     * @description Vertex attribute to be treated as a texture coordinate (set 3).
     */
    enum SEMANTIC_TEXCOORD3 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD4
     * @description Vertex attribute to be treated as a texture coordinate (set 4).
     */
    enum SEMANTIC_TEXCOORD4 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD5
     * @description Vertex attribute to be treated as a texture coordinate (set 5).
     */
    enum SEMANTIC_TEXCOORD5 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD6
     * @description Vertex attribute to be treated as a texture coordinate (set 6).
     */
    enum SEMANTIC_TEXCOORD6 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_TEXCOORD7
     * @description Vertex attribute to be treated as a texture coordinate (set 7).
     */
    enum SEMANTIC_TEXCOORD7 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR0
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR0 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR1
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR1 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR2
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR2 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR3
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR3 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR4
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR4 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR5
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR5 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR6
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR6 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR7
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR7 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR8
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR8 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR9
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR9 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR10
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR10 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR11
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR11 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR12
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR12 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR13
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR13 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR14
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR14 {
    }
    /**
     * @enum pc.SEMANTIC
     * @name pc.SEMANTIC_ATTR15
     * @description Vertex attribute with a user defined semantic.
     */
    enum SEMANTIC_ATTR15 {
    }
    /**
     * @enum pc.TEXTURELOCK
     * @name pc.TEXTURELOCK_READ
     * @description Read only. Any changes to the locked mip level's pixels will not update the texture.
     */
    enum TEXTURELOCK_READ {
    }
    /**
     * @enum pc.TEXTURELOCK
     * @name pc.TEXTURELOCK_WRITE
     * @description Write only. The contents of the specified mip level will be entirely replaced.
     */
    enum TEXTURELOCK_WRITE {
    }
    /**
     * @constructor
     * @name pc.IndexBuffer
     * @classdesc An index buffer is the mechanism via which the application specifies primitive
     * index data to the graphics hardware.
     * @description Creates a new index buffer.
     * @example
     * // Create an index buffer holding 3 16-bit indices
     * // The buffer is marked as static, hinting that the buffer will never be modified
     * var indexBuffer = new pc.IndexBuffer(graphicsDevice, pc.INDEXFORMAT_UINT16, 3, pc.BUFFER_STATIC);
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device used to manage this index buffer.
     * @param {Number} format The type of each index to be stored in the index buffer (see pc.INDEXFORMAT_*).
     * @param {Number} numIndices The number of indices to be stored in the index buffer.
     * @param {Number} [usage] The usage type of the vertex buffer (see pc.BUFFER_*).
     * @param {ArrayBuffer} [initialData] Initial data.
     */
    class IndexBuffer {
        constructor(graphicsDevice: pc.GraphicsDevice, format: number, numIndices: number, usage?: number, initialData?: ArrayBuffer);
        /**
         * @function
         * @name pc.IndexBuffer#destroy
         * @description Frees resources associated with this index buffer.
         */
        destroy(): void;
        /**
         * @function
         * @name pc.IndexBuffer#getFormat
         * @description Returns the data format of the specified index buffer.
         * @returns {Number} The data format of the specified index buffer (see pc.INDEXFORMAT_*).
         */
        getFormat(): number;
        /**
         * @function
         * @name pc.IndexBuffer#getNumIndices
         * @description Returns the number of indices stored in the specified index buffer.
         * @returns {Number} The number of indices stored in the specified index buffer.
         */
        getNumIndices(): number;
        /**
         * @function
         * @name pc.IndexBuffer#lock
         * @description Gives access to the block of memory that stores the buffer's indices.
         * @returns {ArrayBuffer} A contiguous block of memory where index data can be written to.
         */
        lock(): ArrayBuffer;
        /**
         * @function
         * @name pc.IndexBuffer#unlock
         * @description Signals that the block of memory returned by a call to the lock function is
         * ready to be given to the graphics hardware. Only unlocked index buffers can be set on the
         * currently active device.
         */
        unlock(): void;
    }
    /**
     * @constructor
     * @name pc.PostEffect
     * @classdesc Base class for all post effects. Post effects take a a render target as input
     * apply effects to it and then render the result to an output render target or the screen
     * if no output is specified.
     * @description Creates new PostEffect
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device of the application
     */
    class PostEffect {
        constructor(graphicsDevice: pc.GraphicsDevice);
        /**
         * @function
         * @name pc.PostEffect#render
         * @description Render the post effect using the specified inputTarget
         * to the specified outputTarget.
         * @param {pc.RenderTarget} inputTarget The input render target
         * @param {pc.RenderTarget} outputTarget The output render target. If null then this will be the screen.
         * @param {pc.Vec4} rect (Optional) The rect of the current camera. If not specified then it will default to [0,0,1,1]
         */
        render(inputTarget: pc.RenderTarget, outputTarget: pc.RenderTarget, rect: pc.Vec4): void;
    }
    /**
     * @constructor
     * @name pc.RenderTarget
     * @classdesc A render target is a rectangular rendering surface.
     * @description Creates a new render target. A color buffer or a depth buffer must be set.
     * @param {Object} options Object for passing optional arguments.
     * @param {pc.Texture} [options.colorBuffer] The texture that this render target will treat as a rendering surface.
     * @param {Boolean} [options.depth] If set to true, depth buffer will be created. Defaults to true. Ignored if depthBuffer is defined.
     * @param {Boolean} [options.stencil] If set to true, depth buffer will include stencil. Defaults to false. Ignored if depthBuffer is defined or depth is false.
     * @param {pc.Texture} [options.depthBuffer] The texture that this render target will treat as a depth/stencil surface (WebGL2 only). If set, the 'depth' and 'stencil' properties are ignored.
     * Texture must have pc.PIXELFORMAT_DEPTH or PIXELFORMAT_DEPTHSTENCIL format.
     * @param {Number} [options.samples] Number of hardware anti-aliasing samples (WebGL2 only). Default is 1.
     * @param {Boolean} [options.autoResolve] If samples > 1, enables or disables automatic MSAA resolve after rendering to this RT (see pc.RenderTarget#resolve). Defaults to true;
     * Defaults to true.
     * @param {Number} [options.face] If the colorBuffer parameter is a cubemap, use this option to specify the
     * face of the cubemap to render to. Can be:
     * <ul>
     *     <li>pc.CUBEFACE_POSX</li>
     *     <li>pc.CUBEFACE_NEGX</li>
     *     <li>pc.CUBEFACE_POSY</li>
     *     <li>pc.CUBEFACE_NEGY</li>
     *     <li>pc.CUBEFACE_POSZ</li>
     *     <li>pc.CUBEFACE_NEGZ</li>
     * </ul>
     * Defaults to pc.CUBEFACE_POSX.
     * @example
     * // Create a 512x512x24-bit render target with a depth buffer
     * var colorBuffer = new pc.Texture(graphicsDevice, {
     *     width: 512,
     *     height: 512,
     *     format: pc.PIXELFORMAT_R8_G8_B8
     * });
     * var renderTarget = new pc.RenderTarget({
     *     colorBuffer: colorBuffer,
     *     depth: true
     * });
     *
     * // Set the render target on a layer
     * layer.renderTarget = renderTarget;
     */
    class RenderTarget {
        constructor(options: {
            colorBuffer?: pc.Texture;
            depth?: boolean;
            stencil?: boolean;
            depthBuffer?: pc.Texture;
            samples?: number;
            autoResolve?: boolean;
            face?: number;
        });
        /**
         * @function
         * @name pc.RenderTarget#destroy
         * @description Frees resources associated with this render target.
         */
        destroy(): void;
        /**
         * @function
         * @name pc.RenderTarget#resolve
         * @description If samples > 1, resolves the anti-aliased render target (WebGL2 only).
         * When you're rendering to an anti-aliased render target, pixels aren't written directly to the readable texture.
         * Instead, they're first written to a MSAA buffer, where each sample for each pixel is stored independently.
         * In order to read the results, you first need to 'resolve' the buffer - to average all samples and create a simple texture with one color per pixel.
         * This function performs this averaging and updates the colorBuffer and the depthBuffer.
         * If autoResolve is set to true, the resolve will happen after every rendering to this render target, otherwise you can do it manually,
         * during the app update or inside a pc.Command.
         * @param {Boolean} color Resolve color buffer
         * @param {Boolean} depth Resolve depth buffer
         */
        resolve(color: boolean, depth: boolean): void;
        /**
         * @function
         * @name pc.RenderTarget#copy
         * @description Copies color and/or depth contents of source render target to this one. Formats, sizes and anti-aliasing samples must match.
         * Depth buffer can only be copied on WebGL 2.0.
         * @param {pc.RenderTarget} source Source render target to copy from
         * @param {Boolean} color Copy color buffer
         * @param {Boolean} depth Copy depth buffer
         * @returns {Boolean} true if the copy was successfull, false otherwise.
         */
        copy(source: pc.RenderTarget, color: boolean, depth: boolean): boolean;
        /**
         * @readonly
         * @name pc.RenderTarget#colorBuffer
         * @type pc.Texture
         * @description Color buffer set up on the render target.
         */
        readonly colorBuffer: pc.Texture;
        /**
         * @readonly
         * @name pc.RenderTarget#depthBuffer
         * @type pc.Texture
         * @description Depth buffer set up on the render target. Only available, if depthBuffer was set in constructor.
         * Not available, if depth property was used instead.
         */
        readonly depthBuffer: pc.Texture;
        /**
         * @readonly
         * @name pc.RenderTarget#face
         * @type Number
         * @description If the render target is bound to a cubemap, this property
         * specifies which face of the cubemap is rendered to. Can be:
         * <ul>
         *     <li>pc.CUBEFACE_POSX</li>
         *     <li>pc.CUBEFACE_NEGX</li>
         *     <li>pc.CUBEFACE_POSY</li>
         *     <li>pc.CUBEFACE_NEGY</li>
         *     <li>pc.CUBEFACE_POSZ</li>
         *     <li>pc.CUBEFACE_NEGZ</li>
         * </ul>
         */
        readonly face: number;
        /**
         * @readonly
         * @name pc.RenderTarget#width
         * @type Number
         * @description Width of the render target in pixels.
         */
        readonly width: number;
        /**
         * @readonly
         * @name pc.RenderTarget#height
         * @type Number
         * @description Height of the render target in pixels.
         */
        readonly height: number;
    }
    /**
     * @constructor
     * @name pc.Shader
     * @classdesc A shader is a program that is responsible for rendering graphical primitives on a device's
     * graphics processor. The shader is generated from a shader definition. This shader definition specifies
     * the code for processing vertices and fragments processed by the GPU. The language of the code is GLSL
     * (or more specifically ESSL, the OpenGL ES Shading Language). The shader definition also describes how
     * the PlayCanvas engine should map vertex buffer elements onto the attributes specified in the vertex
     * shader code.
     * @description Creates a new shader object.
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device used to manage this shader.
     * @param {Object} definition The shader definition from which to build the shader.
     * @param {Object} definition.attributes Object detailing the mapping of vertex shader attribute names
     * to semantics (pc.SEMANTIC_*). This enables the engine to match vertex buffer data as inputs to the
     * shader.
     * @param {String} definition.vshader Vertex shader source (GLSL code).
     * @param {String} definition.fshader Fragment shader source (GLSL code).
     * @param {Boolean} definition.useTransformFeedback Specifies that this shader outputs post-VS data to a buffer
     * @param {Object} precache Triggers imediate link.
     * @example
     * // Create a shader that renders primitives with a solid red color
     * var shaderDefinition = {
     *     attributes: {
     *         aPosition: pc.SEMANTIC_POSITION
     *     },
     *     vshader: [
     *         "attribute vec3 aPosition;",
     *         "",
     *         "void main(void)",
     *         "{",
     *         "    gl_Position = vec4(aPosition, 1.0);",
     *         "}"
     *     ].join("\n"),
     *     fshader: [
     *         "precision " + graphicsDevice.precision + " float;",
     *         "",
     *         "void main(void)",
     *         "{",
     *         "    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
     *         "}"
     *     ].join("\n")
     * };
     *
     * shader = new pc.Shader(graphicsDevice, shaderDefinition);
     */
    class Shader {
        constructor(graphicsDevice: pc.GraphicsDevice, definition: {
            attributes: any;
            vshader: string;
            fshader: string;
            useTransformFeedback: boolean;
        }, precache: any);
        /**
         * @function
         * @name pc.Shader#destroy
         * @description Frees resources associated with this shader.
         */
        destroy(): void;
    }
    /**
     * @constructor
     * @name pc.Texture
     * @classdesc A texture is a container for texel data that can be utilized in a fragment shader.
     * Typically, the texel data represents an image that is mapped over geometry.
     * @description Creates a new texture.
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device used to manage this texture.
     * @param {Object} options Object for passing optional arguments.
     * @param {Number} options.width The width of the texture in pixels. Defaults to 4.
     * @param {Number} options.height The height of the texture in pixels. Defaults to 4.
     * @param {Number} options.depth The number of depth slices in a 3D texture (WebGL2 only). Defaults to 1 (single 2D image).
     * @param {Number} options.format The pixel format of the texture. Can be:
     * <ul>
     *     <li>{@link pc.PIXELFORMAT_A8}</li>
     *     <li>{@link pc.PIXELFORMAT_L8}</li>
     *     <li>{@link pc.PIXELFORMAT_L8_A8}</li>
     *     <li>{@link pc.PIXELFORMAT_R5_G6_B5}</li>
     *     <li>{@link pc.PIXELFORMAT_R5_G5_B5_A1}</li>
     *     <li>{@link pc.PIXELFORMAT_R4_G4_B4_A4}</li>
     *     <li>{@link pc.PIXELFORMAT_R8_G8_B8}</li>
     *     <li>{@link pc.PIXELFORMAT_R8_G8_B8_A8}</li>
     *     <li>{@link pc.PIXELFORMAT_DXT1}</li>
     *     <li>{@link pc.PIXELFORMAT_DXT3}</li>
     *     <li>{@link pc.PIXELFORMAT_DXT5}</li>
     *     <li>{@link pc.PIXELFORMAT_RGB16F}</li>
     *     <li>{@link pc.PIXELFORMAT_RGBA16F}</li>
     *     <li>{@link pc.PIXELFORMAT_RGB32F}</li>
     *     <li>{@link pc.PIXELFORMAT_RGBA32F}</li>
     *     <li>{@link pc.PIXELFORMAT_ETC1}</li>
     *     <li>{@link pc.PIXELFORMAT_PVRTC_2BPP_RGB_1}</li>
     *     <li>{@link pc.PIXELFORMAT_PVRTC_2BPP_RGBA_1}</li>
     *     <li>{@link pc.PIXELFORMAT_PVRTC_4BPP_RGB_1}</li>
     *     <li>{@link pc.PIXELFORMAT_PVRTC_4BPP_RGBA_1}</li>
     *     <li>{@link pc.PIXELFORMAT_111110F}</li>
     * </ul>
     * Defaults to pc.PIXELFORMAT_R8_G8_B8_A8.
     * @param {Number} options.minFilter The minification filter type to use. Defaults to {@link pc.FILTER_LINEAR_MIPMAP_LINEAR}
     * @param {Number} options.magFilter The magnification filter type to use. Defaults to {@link pc.FILTER_LINEAR}
     * @param {Number} options.anisotropy The level of anisotropic filtering to use. Defaults to 1
     * @param {Number} options.addressU The repeat mode to use in the U direction. Defaults to {@link pc.ADDRESS_REPEAT}
     * @param {Number} options.addressV The repeat mode to use in the V direction. Defaults to {@link pc.ADDRESS_REPEAT}
     * @param {Boolean} options.mipmaps When enabled try to generate or use mipmaps for this texture. Default is true
     * @param {Boolean} options.cubemap Specifies whether the texture is to be a cubemap. Defaults to false.
     * @param {Boolean} options.volume Specifies whether the texture is to be a 3D volume (WebGL2 only). Defaults to false.
     * @param {Boolean} options.rgbm Specifies whether the texture contains RGBM-encoded HDR data. Defaults to false.
     * @param {Boolean} options.fixCubemapSeams Specifies whether this cubemap texture requires special
     * seam fixing shader code to look right. Defaults to false.
     * @param {Boolean} options.flipY Specifies whether the texture should be flipped in the Y-direction. Only affects textures
     * with a source that is an image, canvas or video element. Does not affect cubemaps, compressed textures or textures set from raw
     * pixel data. Defaults to true.
     * @param {Boolean} options.premultiplyAlpha If true, the alpha channel of the texture (if present) is multiplied into the color
     * channels. Defaults to false.
     * @param {Boolean} options.compareOnRead When enabled, and if texture format is pc.PIXELFORMAT_DEPTH or pc.PIXELFORMAT_DEPTHSTENCIL,
     * hardware PCF is enabled for this texture, and you can get filtered results of comparison using texture() in your shader (WebGL2 only).
     * Defaults to false.
     * @param {Number} options.compareFunc Comparison function when compareOnRead is enabled (WebGL2 only). Defaults to pc.FUNC_LESS.
     * Possible values:
     * <ul>
     *     <li>pc.FUNC_LESS</li>
     *     <li>pc.FUNC_LESSEQUAL</li>
     *     <li>pc.FUNC_GREATER</li>
     *     <li>pc.FUNC_GREATEREQUAL</li>
     *     <li>pc.FUNC_EQUAL</li>
     *     <li>pc.FUNC_NOTEQUAL</li>
     * </ul>
     * @example
     * // Create a 8x8x24-bit texture
     * var texture = new pc.Texture(graphicsDevice, {
     *     width: 8,
     *     height: 8,
     *     format: pc.PIXELFORMAT_R8_G8_B8
     * });
     *
     * // Fill the texture with a gradient
     * var pixels = texture.lock();
     * var count = 0;
     * for (var i = 0; i < 8; i++) {
     *     for (var j = 0; j < 8; j++) {
     *         pixels[count++] = i * 32;
     *         pixels[count++] = j * 32;
     *         pixels[count++] = 255;
     *     }
     * }
     * texture.unlock();
     * @property {String} name The name of the texture. Defaults to null.
     */
    class Texture {
        constructor(graphicsDevice: pc.GraphicsDevice, options: {
            width: number;
            height: number;
            depth: number;
            format: number;
            minFilter: number;
            magFilter: number;
            anisotropy: number;
            addressU: number;
            addressV: number;
            mipmaps: boolean;
            cubemap: boolean;
            volume: boolean;
            rgbm: boolean;
            fixCubemapSeams: boolean;
            flipY: boolean;
            premultiplyAlpha: boolean;
            compareOnRead: boolean;
            compareFunc: number;
        });
        /**
         * @name pc.Texture#minFilter
         * @type Number
         * @description The minification filter to be applied to the texture. Can be:
         * <ul>
         *     <li>{@link pc.FILTER_NEAREST}</li>
         *     <li>{@link pc.FILTER_LINEAR}</li>
         *     <li>{@link pc.FILTER_NEAREST_MIPMAP_NEAREST}</li>
         *     <li>{@link pc.FILTER_NEAREST_MIPMAP_LINEAR}</li>
         *     <li>{@link pc.FILTER_LINEAR_MIPMAP_NEAREST}</li>
         *     <li>{@link pc.FILTER_LINEAR_MIPMAP_LINEAR}</li>
         * </ul>
         */
        minFilter: number;
        /**
         * @name pc.Texture#magFilter
         * @type Number
         * @description The magnification filter to be applied to the texture. Can be:
         * <ul>
         *     <li>{@link pc.FILTER_NEAREST}</li>
         *     <li>{@link pc.FILTER_LINEAR}</li>
         * </ul>
         */
        magFilter: number;
        /**
         * @name pc.Texture#addressU
         * @type Number
         * @description The addressing mode to be applied to the texture horizontally. Can be:
         * <ul>
         *     <li>{@link pc.ADDRESS_REPEAT}</li>
         *     <li>{@link pc.ADDRESS_CLAMP_TO_EDGE}</li>
         *     <li>{@link pc.ADDRESS_MIRRORED_REPEAT}</li>
         * </ul>
         */
        addressU: number;
        /**
         * @name pc.Texture#addressV
         * @type Number
         * @description The addressing mode to be applied to the texture vertically. Can be:
         * <ul>
         *     <li>{@link pc.ADDRESS_REPEAT}</li>
         *     <li>{@link pc.ADDRESS_CLAMP_TO_EDGE}</li>
         *     <li>{@link pc.ADDRESS_MIRRORED_REPEAT}</li>
         * </ul>
         */
        addressV: number;
        /**
         * @name pc.Texture#addressW
         * @type Number
         * @description The addressing mode to be applied to the 3D texture depth (WebGL2 only). Can be:
         * <ul>
         *     <li>{@link pc.ADDRESS_REPEAT}</li>
         *     <li>{@link pc.ADDRESS_CLAMP_TO_EDGE}</li>
         *     <li>{@link pc.ADDRESS_MIRRORED_REPEAT}</li>
         * </ul>
         */
        addressW: number;
        /**
         * @name pc.Texture#compareOnRead
         * @type Boolean
         * @description When enabled, and if texture format is pc.PIXELFORMAT_DEPTH or pc.PIXELFORMAT_DEPTHSTENCIL,
         * hardware PCF is enabled for this texture, and you can get filtered results of comparison using texture() in your shader (WebGL2 only).
         */
        compareOnRead: boolean;
        /**
         * @name pc.Texture#compareFunc
         * @type Number
         * @description Comparison function when compareOnRead is enabled (WebGL2 only).
         * Possible values:
         * <ul>
         *     <li>pc.FUNC_LESS</li>
         *     <li>pc.FUNC_LESSEQUAL</li>
         *     <li>pc.FUNC_GREATER</li>
         *     <li>pc.FUNC_GREATEREQUAL</li>
         *     <li>pc.FUNC_EQUAL</li>
         *     <li>pc.FUNC_NOTEQUAL</li>
         * </ul>
         */
        compareFunc: number;
        /**
         * @name pc.Texture#anisotropy
         * @type Number
         * @description Integer value specifying the level of anisotropic to apply to the texture
         * ranging from 1 (no anisotropic filtering) to the {@link pc.GraphicsDevice} property maxAnisotropy.
         */
        anisotropy: number;
        /**
         * @name pc.Texture#mipmaps
         * @type Boolean
         * @description Defines if texture should generate/upload mipmaps if possible.
         */
        mipmaps: boolean;
        /**
         * @readonly
         * @name pc.Texture#width
         * @type Number
         * @description The width of the texture in pixels.
         */
        readonly width: number;
        /**
         * @readonly
         * @name pc.Texture#height
         * @type Number
         * @description The height of the texture in pixels.
         */
        readonly height: number;
        /**
         * @readonly
         * @name pc.Texture#depth
         * @type Number
         * @description The number of depth slices in a 3D texture (WebGL2 only).
         */
        readonly depth: number;
        /**
         * @readonly
         * @name pc.Texture#format
         * @type Number
         * @description The pixel format of the texture. Can be:
         * <ul>
         *     <li>{@link pc.PIXELFORMAT_A8}</li>
         *     <li>{@link pc.PIXELFORMAT_L8}</li>
         *     <li>{@link pc.PIXELFORMAT_L8_A8}</li>
         *     <li>{@link pc.PIXELFORMAT_R5_G6_B5}</li>
         *     <li>{@link pc.PIXELFORMAT_R5_G5_B5_A1}</li>
         *     <li>{@link pc.PIXELFORMAT_R4_G4_B4_A4}</li>
         *     <li>{@link pc.PIXELFORMAT_R8_G8_B8}</li>
         *     <li>{@link pc.PIXELFORMAT_R8_G8_B8_A8}</li>
         *     <li>{@link pc.PIXELFORMAT_DXT1}</li>
         *     <li>{@link pc.PIXELFORMAT_DXT3}</li>
         *     <li>{@link pc.PIXELFORMAT_DXT5}</li>
         *     <li>{@link pc.PIXELFORMAT_RGB16F}</li>
         *     <li>{@link pc.PIXELFORMAT_RGBA16F}</li>
         *     <li>{@link pc.PIXELFORMAT_RGB32F}</li>
         *     <li>{@link pc.PIXELFORMAT_RGBA32F}</li>
         *     <li>{@link pc.PIXELFORMAT_ETC1}</li>
         *     <li>{@link pc.PIXELFORMAT_PVRTC_2BPP_RGB_1}</li>
         *     <li>{@link pc.PIXELFORMAT_PVRTC_2BPP_RGBA_1}</li>
         *     <li>{@link pc.PIXELFORMAT_PVRTC_4BPP_RGB_1}</li>
         *     <li>{@link pc.PIXELFORMAT_PVRTC_4BPP_RGBA_1}</li>
         *     <li>{@link pc.PIXELFORMAT_111110F}</li>
         * </ul>
         */
        readonly format: number;
        /**
         * @readonly
         * @name pc.Texture#cubemap
         * @type Boolean
         * @description Returns true if this texture is a cube map and false otherwise.
         */
        readonly cubemap: boolean;
        /**
         * @readonly
         * @name pc.Texture#volume
         * @type Boolean
         * @description Returns true if this texture is a 3D volume and false otherwise.
         */
        readonly volume: boolean;
        /**
         * @name pc.Texture#flipY
         * @type Boolean
         * @description Specifies whether the texture should be flipped in the Y-direction. Only affects textures
         * with a source that is an image, canvas or video element. Does not affect cubemaps, compressed textures
         * or textures set from raw pixel data. Defaults to true.
         */
        flipY: boolean;
        /**
         * @readonly
         * @name pc.Texture#pot
         * @type Boolean
         * @description Returns true if all dimensions of the texture are power of two, and false otherwise.
         */
        readonly pot: boolean;
        /**
         * @function
         * @name pc.Texture#destroy
         * @description Forcibly free up the underlying WebGL resource owned by the texture.
         */
        destroy(): void;
        /**
         * @function
         * @name pc.Texture#lock
         * @description Locks a miplevel of the texture, returning a typed array to be filled with pixel data.
         * @param {Object} options Optional options object. Valid properties are as follows:
         * @param {Number} options.level The mip level to lock with 0 being the top level. Defaults to 0.
         * @param {Number} options.face If the texture is a cubemap, this is the index of the face to lock.
         * @returns {ArrayBuffer} A typed array containing the pixel data of the locked mip level.
         */
        lock(options: {
            level: number;
            face: number;
        }): ArrayBuffer;
        /**
         * @function
         * @name pc.Texture#setSource
         * @description Set the pixel data of the texture from a canvas, image, video DOM element. If the
         * texture is a cubemap, the supplied source must be an array of 6 canvases, images or videos.
         * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement|HTMLCanvasElement[]|HTMLImageElement[]|HTMLVideoElement[]} source A canvas, image or video element,
         * or an array of 6 canvas, image or video elements.
         * @param {Number} mipLevel A non-negative integer specifying the image level of detail. Defaults to 0, which represents the base image source.
         * A level value of N, that is greater than 0, represents the image source for the Nth mipmap reduction level.
         */
        setSource(source: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement[] | HTMLImageElement[] | HTMLVideoElement[], mipLevel: number): void;
        /**
         * @function
         * @name pc.Texture#getSource
         * @description Get the pixel data of the texture. If this is a cubemap then an array of 6 images will be returned otherwise
         * a single image.
         * @param {Number} mipLevel A non-negative integer specifying the image level of detail. Defaults to 0, which represents the base image source.
         * A level value of N, that is greater than 0, represents the image source for the Nth mipmap reduction level.
         * @returns {HTMLImageElement} The source image of this texture. Can be null if source not assigned for specific image level.
         */
        getSource(mipLevel: number): HTMLImageElement;
        /**
         * @function
         * @name pc.Texture#unlock
         * @description Unlocks the currently locked mip level and uploads it to VRAM.
         */
        unlock(): void;
        /**
         * @function
         * @name pc.Texture#upload
         * @description Forces a reupload of the textures pixel data to graphics memory. Ordinarily, this function
         * is called by internally by {@link pc.Texture#setSource} and {@link pc.Texture#unlock}. However, it still needs to
         * be called explicitly in the case where an HTMLVideoElement is set as the source of the texture.  Normally,
         * this is done once every frame before video textured geometry is rendered.
         */
        upload(): void;
    }
    /**
     * @constructor
     * @name pc.TransformFeedback
     * @classdesc Transform feedback helper object.
     * @description This object allows you to configure and use the transform feedback feature (WebGL2 only).
     *  How to use:<br>
     *  <ol>
     *  <li>First, check that you're on WebGL2, by looking at the <code>app.graphicsDevice.webgl2</code> value.</li>
     *  <li>Define the outputs in your vertex shader. The syntax is <code>out vec3 out_vertex_position</code>, note that there must be out_ in the name. You can then simply assign values to these outputs in VS. The order and size of shader outputs must match the output buffer layout.</li>
     *  <li>Create the shader using <code>pc.TransformFeedback.createShader(device, vsCode, yourShaderName)</code>.</li>
     *  <li>Create/acquire the input vertex buffer. Can be any pc.VertexBuffer, either manually created, or from a pc.Mesh.</li>
     *  <li>Create the pc.TransformFeedback object: <code>var tf = new pc.TransformFeedback(inputBuffer)</code>. This object will internally create an output buffer.</li>
     *  <li>Run the shader: <code>tf.process(shader)</code>. Shader will take the input buffer, process it and write to the output buffer, then the input/output buffers will be automatically swapped, so you'll immediately see the result.</li>
     *  </ol>
     * @example
     * // *** shader asset ***
     * attribute vec3 vertex_position;
     * attribute vec3 vertex_normal;
     * attribute vec2 vertex_texCoord0;
     * attribute vec4 vertex_tangent;
     * out vec3 out_vertex_position;
     * out vec3 out_vertex_normal;
     * out vec2 out_vertex_texCoord0;
     * out vec4 out_vertex_tangent;
     * void main(void) {
     *     // read position and normal, write new position (push away)
     *     out_vertex_position = vertex_position + vertex_normal * 0.01;
     *     // pass other attributes unchanged
     *     out_vertex_normal = vertex_normal;
     *     out_vertex_texCoord0 = vertex_texCoord0;
     *     out_vertex_tangent = vertex_tangent;
     * }
     * @example
     * // *** script asset ***
     * var TransformExample = pc.createScript('transformExample');
     *
     * // attribute that references shader asset and material
     * TransformExample.attributes.add('shaderCode', { type: 'asset', assetType: 'shader' });
     * TransformExample.attributes.add('material', { type: 'asset', assetType: 'material' });
     *
     * TransformExample.prototype.initialize = function() {
     *     var device = this.app.graphicsDevice;
     *     var mesh = pc.createTorus(device, { tubeRadius: 0.01, ringRadius: 3 });
     *     var node = new pc.GraphNode();
     *     var meshInstance = new pc.MeshInstance(node, mesh, this.material.resource);
     *     var model = new pc.Model();
     *     model.graph = node;
     *     model.meshInstances = [ meshInstance ];
     *     this.app.scene.addModel(model);
     *
     *     // if webgl2 is not supported, TF is not available
     *     if (!device.webgl2) return;
     *     var inputBuffer = mesh.vertexBuffer;
     *     this.tf = new pc.TransformFeedback(inputBuffer);
     *     this.shader = pc.TransformFeedback.createShader(device, this.shaderCode.resource, "tfMoveUp");
     * };
     *
     * TransformExample.prototype.update = function(dt) {
     *     if (!this.app.graphicsDevice.webgl2) return;
     *     this.tf.process(this.shader);
     * };
     * @param {pc.VertexBuffer} inputBuffer The input vertex buffer
     * @param {Number} [usage] The optional usage type of the output vertex buffer (see pc.BUFFER_*). pc.BUFFER_GPUDYNAMIC is recommended for continuous update, and is the default value.
     */
    class TransformFeedback {
        constructor(inputBuffer: pc.VertexBuffer, usage?: number);
        /**
         * @function
         * @name pc.TransformFeedback#createShader
         * @description Creates a transform feedback ready vertex shader from code.
         * @param {pc.GraphicsDevice} graphicsDevice The graphics device used by the renderer.
         * @param {String} vsCode Vertex shader code. Should contain output variables starting with "out_".
         * @param {String} name Unique name for caching the shader.
         * @returns {pc.Shader} A shader to use in the process() function.
         */
        createShader(graphicsDevice: pc.GraphicsDevice, vsCode: string, name: string): pc.Shader;
        /**
         * @function
         * @name pc.TransformFeedback#destroy
         * @description Destroys the transform feedback helper object
         */
        destroy(): void;
        /**
         * @function
         * @name pc.TransformFeedback#process
         * @description Runs the specified shader on the input buffer, writes results into the new buffer, then optionally swaps input/output.
         * @param {pc.Shader} shader A vertex shader to run. Should be created with pc.TransformFeedback.createShader.
         * @param {Boolean} [swap] Swap input/output buffer data. Useful for continuous buffer processing. Default is true.
         */
        process(shader: pc.Shader, swap?: boolean): void;
        /**
         * @readonly
         * @name pc.TransformFeedback#inputBuffer
         * @type pc.VertexBuffer
         * @description The current input buffer
         */
        readonly inputBuffer: pc.VertexBuffer;
        /**
         * @readonly
         * @name pc.TransformFeedback#outputBuffer
         * @type pc.VertexBuffer
         * @description The current output buffer
         */
        readonly outputBuffer: pc.VertexBuffer;
    }
    /**
     * @constructor
     * @name pc.VertexBuffer
     * @classdesc A vertex buffer is the mechanism via which the application specifies vertex
     * data to the graphics hardware.
     * @description Creates a new vertex buffer object.
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device used to manage this vertex buffer.
     * @param {pc.VertexFormat} format The vertex format of this vertex buffer.
     * @param {Number} numVertices The number of vertices that this vertex buffer will hold.
     * @param {Number} [usage] The usage type of the vertex buffer (see pc.BUFFER_*).
     * @param {ArrayBuffer} [initialData] Initial data.
     */
    class VertexBuffer {
        constructor(graphicsDevice: pc.GraphicsDevice, format: pc.VertexFormat, numVertices: number, usage?: number, initialData?: ArrayBuffer);
        /**
         * @function
         * @name pc.VertexBuffer#destroy
         * @description Frees resources associated with this vertex buffer.
         */
        destroy(): void;
        /**
         * @function
         * @name pc.VertexBuffer#getFormat
         * @description Returns the data format of the specified vertex buffer.
         * @returns {pc.VertexFormat} The data format of the specified vertex buffer.
         */
        getFormat(): pc.VertexFormat;
        /**
         * @function
         * @name pc.VertexBuffer#getUsage
         * @description Returns the usage type of the specified vertex buffer. This indicates
         * whether the buffer can be modified once and used many times (pc.BUFFER_STATIC),
         * modified repeatedly and used many times (pc.BUFFER_DYNAMIC) or modified once
         * and used at most a few times (pc.BUFFER_STREAM).
         * @returns {Number} The usage type of the vertex buffer (see pc.BUFFER_*).
         */
        getUsage(): number;
        /**
         * @function
         * @name pc.VertexBuffer#getNumVertices
         * @description Returns the number of vertices stored in the specified vertex buffer.
         * @returns {Number} The number of vertices stored in the vertex buffer.
         */
        getNumVertices(): number;
        /**
         * @function
         * @name pc.VertexBuffer#lock
         * @description Returns a mapped memory block representing the content of the vertex buffer.
         * @returns {ArrayBuffer} An array containing the byte data stored in the vertex buffer.
         */
        lock(): ArrayBuffer;
        /**
         * @function
         * @name pc.VertexBuffer#unlock
         * @description Notifies the graphics engine that the client side copy of the vertex buffer's
         * memory can be returned to the control of the graphics driver.
         */
        unlock(): void;
    }
    /**
     * @constructor
     * @name pc.VertexFormat
     * @classdesc A vertex format is a descriptor that defines the layout of vertex data inside
     * a {@link pc.VertexBuffer}.
     * @description Returns a new pc.VertexFormat object.
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device used to manage this vertex format.
     * @param {Object[]} description An array of vertex attribute descriptions.
     * @param {Number} description[].semantic The meaning of the vertex element. This is used to link
     * the vertex data to a shader input. Can be:
     * <ul>
     *     <li>pc.SEMANTIC_POSITION</li>
     *     <li>pc.SEMANTIC_NORMAL</li>
     *     <li>pc.SEMANTIC_TANGENT</li>
     *     <li>pc.SEMANTIC_BLENDWEIGHT</li>
     *     <li>pc.SEMANTIC_BLENDINDICES</li>
     *     <li>pc.SEMANTIC_COLOR</li>
     *     <li>pc.SEMANTIC_TEXCOORD0</li>
     *     <li>pc.SEMANTIC_TEXCOORD1</li>
     *     <li>pc.SEMANTIC_TEXCOORD2</li>
     *     <li>pc.SEMANTIC_TEXCOORD3</li>
     *     <li>pc.SEMANTIC_TEXCOORD4</li>
     *     <li>pc.SEMANTIC_TEXCOORD5</li>
     *     <li>pc.SEMANTIC_TEXCOORD6</li>
     *     <li>pc.SEMANTIC_TEXCOORD7</li>
     * </ul>
     * If vertex data has a meaning other that one of those listed above, use the user-defined
     * semantics: pc.SEMANTIC_ATTR0 to pc.SEMANTIC_ATTR15.
     * @param {Number} description[].components The number of components of the vertex attribute.
     * Can be 1, 2, 3 or 4.
     * @param {Number} description[].type The data type of the attribute. Can be:
     * <ul>
     *     <li>pc.TYPE_INT8</li>
     *     <li>pc.TYPE_UINT8</li>
     *     <li>pc.TYPE_INT16</li>
     *     <li>pc.TYPE_UINT16</li>
     *     <li>pc.TYPE_INT32</li>
     *     <li>pc.TYPE_UINT32</li>
     *     <li>pc.TYPE_FLOAT32</li>
     * </ul>
     * @param {Boolean} description[].normalize If true, vertex attribute data will be mapped from a
     * 0 to 255 range down to 0 to 1 when fed to a shader. If false, vertex attribute data is left
     * unchanged. If this property is unspecified, false is assumed.
     * @example
     * // Specify 3-component positions (x, y, z)
     * var vertexFormat = new pc.VertexFormat(graphicsDevice, [
     *     { semantic: pc.SEMANTIC_POSITION, components: 3, type: pc.TYPE_FLOAT32 },
     * ]);
     * @example
     * // Specify 2-component positions (x, y), a texture coordinate (u, v) and a vertex color (r, g, b, a)
     * var vertexFormat = new pc.VertexFormat(graphicsDevice, [
     *     { semantic: pc.SEMANTIC_POSITION, components: 2, type: pc.TYPE_FLOAT32 },
     *     { semantic: pc.SEMANTIC_TEXCOORD0, components: 2, type: pc.TYPE_FLOAT32 },
     *     { semantic: pc.SEMANTIC_COLOR, components: 4, type: pc.TYPE_UINT8, normalize: true }
     * ]);
     */
    class VertexFormat {
        constructor(graphicsDevice: pc.GraphicsDevice, description: object[]);
    }
    /**
     * @constructor
     * @name pc.VertexIterator
     * @classdesc A vertex iterator simplifies the process of writing vertex data to a vertex buffer.
     * @description Returns a new pc.VertexIterator object.
     * @param {pc.VertexBuffer} vertexBuffer The vertex buffer to be iterated.
     */
    class VertexIterator {
        constructor(vertexBuffer: pc.VertexBuffer);
        /**
         * @function
         * @name pc.VertexIterator#next
         * @description Moves the vertex iterator on to the next vertex.
         * @param {Number} [count] Optional number of steps to move on when calling next, defaults to 1.
         * @example
         * var iterator = new pc.VertexIterator(vertexBuffer);
         * iterator.element[pc.SEMANTIC_POSTIION].set(-0.9, -0.9, 0.0);
         * iterator.element[pc.SEMANTIC_COLOR].set(255, 0, 0, 255);
         * iterator.next();
         * iterator.element[pc.SEMANTIC_POSTIION].set(0.9, -0.9, 0.0);
         * iterator.element[pc.SEMANTIC_COLOR].set(0, 255, 0, 255);
         * iterator.next();
         * iterator.element[pc.SEMANTIC_POSTIION].set(0.0, 0.9, 0.0);
         * iterator.element[pc.SEMANTIC_COLOR].set(0, 0, 255, 255);
         * iterator.end();
         */
        next(count?: number): void;
        /**
         * @function
         * @name pc.VertexIterator#end
         * @description Notifies the vertex buffer being iterated that writes are complete. Internally
         * the vertex buffer is unlocked and vertex data is uploaded to video memory.
         * @example
         * var iterator = new pc.VertexIterator(vertexBuffer);
         * iterator.element[pc.SEMANTIC_POSTIION].set(-0.9, -0.9, 0.0);
         * iterator.element[pc.SEMANTIC_COLOR].set(255, 0, 0, 255);
         * iterator.next();
         * iterator.element[pc.SEMANTIC_POSTIION].set(0.9, -0.9, 0.0);
         * iterator.element[pc.SEMANTIC_COLOR].set(0, 255, 0, 255);
         * iterator.next();
         * iterator.element[pc.SEMANTIC_POSTIION].set(0.0, 0.9, 0.0);
         * iterator.element[pc.SEMANTIC_COLOR].set(0, 0, 255, 255);
         * iterator.end();
         */
        end(): void;
    }
    /**
     * @constructor
     * @name pc.Controller
     * @classdesc A general input handler which handles both mouse and keyboard input assigned to named actions.
     * This allows you to define input handlers separately to defining keyboard/mouse configurations.
     * @description Create a new instance of a Controller.
     * @param {Element} [element] Element to attach Controller to.
     * @param {Object} [options] Optional arguments.
     * @param {pc.Keyboard} [options.keyboard] A Keyboard object to use.
     * @param {pc.Mouse} [options.mouse] A Mouse object to use.
     * @param {pc.GamePads} [options.gamepads] A Gamepads object to use.
     * @example
     * var c = new pc.Controller(document)
     *
     * // Register the "fire" action and assign it to both the Enter key and the Spacebar.
     * c.registerKeys("fire", [pc.KEY_ENTER, pc.KEY_SPACE]);
     */
    class Controller {
        constructor(element?: Element, options?: {
            keyboard?: pc.Keyboard;
            mouse?: pc.Mouse;
            gamepads?: pc.GamePads;
        });
        /**
         * @function
         * @name pc.Controller#attach
         * @description Attach Controller to a Element, this is required before you can monitor for key/mouse inputs.
         * @param {Element} element The element to attach mouse and keyboard event handler too
         */
        attach(element: Element): void;
        /**
         * @function
         * @name pc.Controller#detach
         * @description Detach Controller from an Element, this should be done before the Controller is destroyed
         */
        detach(): void;
        /**
         * @function
         * @name pc.Controller#disableContextMenu
         * @description Disable the context menu usually activated with the right mouse button.
         */
        disableContextMenu(): void;
        /**
         * @function
         * @name pc.Controller#enableContextMenu
         * @description Enable the context menu usually activated with the right mouse button. This is enabled by default.
         */
        enableContextMenu(): void;
        /**
         * @function
         * @name pc.Controller#update
         * @description Update the Keyboard and Mouse handlers
         * @param {Object} dt The time since the last frame
         */
        update(dt: any): void;
        /**
         * @function
         * @name pc.Controller#registerKeys
         * @description Create or update a action which is enabled when the supplied keys are pressed.
         * @param {String} action The name of the action
         * @param {Number[]} keys A list of keycodes
         */
        registerKeys(action: string, keys: Number[]): void;
        /**
         * @function
         * @name pc.Controller#registerMouse
         * @description Create or update an action which is enabled when the supplied mouse button is pressed
         * @param {String} action The name of the action
         * @param {Number} button The mouse button
         */
        registerMouse(action: string, button: number): void;
        /**
         * @function
         * @name pc.Controller#registerPadButton
         * @description Create or update an action which is enabled when the gamepad button is pressed
         * @param {String} action The name of the action
         * @param {Number} pad The index of the pad to register (use pc.PAD_1, etc)
         * @param {Number} button The pad button
         */
        registerPadButton(action: string, pad: number, button: number): void;
        /**
         * @function
         * @name pc.Controller#registerAxis
         * @param {Object} [options] Optional options object.
         * @param {Object} [options.pad] The index of the game pad to register for (use pc.PAD_1, etc)
         */
        registerAxis(options?: {
            pad?: any;
        }): void;
        /**
         * @function
         * @name pc.Controller#isPressed
         * @description Returns true if the current action is enabled.
         * @param {String} actionName The name of the action.
         * @returns {Boolean} True if the action is enabled.
         */
        isPressed(actionName: string): boolean;
        /**
         * @function
         * @name pc.Controller#wasPressed
         * @description Returns true if the action was enabled this since the last update.
         * @param {String} actionName The name of the action.
         * @returns {Boolean} True if the action was enabled this since the last update.
         */
        wasPressed(actionName: string): boolean;
    }
    /**
     * @constructor
     * @name pc.ElementInputEvent
     * @classdesc Represents an input event fired on a {@link pc.ElementComponent}. When an event is raised
     * on an ElementComponent it bubbles up to its parent ElementComponents unless we call stopPropagation().
     * @description Create an instance of a pc.ElementInputEvent.
     * @param {MouseEvent|TouchEvent} event The MouseEvent or TouchEvent that was originally raised.
     * @param {pc.ElementComponent} element The ElementComponent that this event was originally raised on.
     * @param {pc.CameraComponent} camera The CameraComponent that this event was originally raised via.
     * @property {MouseEvent|TouchEvent} event The MouseEvent or TouchEvent that was originally raised.
     * @property {pc.ElementComponent} element The ElementComponent that this event was originally raised on.
     */
    class ElementInputEvent {
        constructor(event: MouseEvent | TouchEvent, element: pc.ElementComponent, camera: pc.CameraComponent);
        /**
         * @function
         * @name pc.ElementInputEvent#stopPropagation
         * @description Stop propagation of the event to parent {@link pc.ElementComponent}s. This also stops propagation of the event to other event listeners of the original DOM Event.
         */
        stopPropagation(): void;
    }
    /**
     * @constructor
     * @name pc.ElementMouseEvent
     * @classdesc Represents a Mouse event fired on a {@link pc.ElementComponent}.
     * @extends pc.ElementInputEvent
     * @description Create an instance of a pc.ElementMouseEvent.
     * @param {MouseEvent} event The MouseEvent that was originally raised.
     * @param {pc.ElementComponent} element The ElementComponent that this event was originally raised on.
     * @param {pc.CameraComponent} camera The CameraComponent that this event was originally raised via.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @param {Number} lastX The last x coordinate
     * @param {Number} lastY The last y coordinate
     * @property {Boolean} ctrlKey Whether the ctrl key was pressed
     * @property {Boolean} altKey Whether the alt key was pressed
     * @property {Boolean} shiftKey Whether the shift key was pressed
     * @property {Boolean} metaKey Whether the meta key was pressed
     * @property {Number} button The mouse button
     * @property {Number} dx The amount of horizontal movement of the cursor
     * @property {Number} dy The amount of vertical movement of the cursor
     * @property {Number} wheel The amount of the wheel movement
     */
    class ElementMouseEvent extends pc.ElementInputEvent {
        constructor(event: MouseEvent, element: pc.ElementComponent, camera: pc.CameraComponent, x: number, y: number, lastX: number, lastY: number);
        /**
         * @function
         * @name pc.ElementInputEvent#stopPropagation
         * @description Stop propagation of the event to parent {@link pc.ElementComponent}s. This also stops propagation of the event to other event listeners of the original DOM Event.
         */
        stopPropagation(): void;
    }
    /**
     * @constructor
     * @name pc.ElementTouchEvent
     * @classdesc Represents a TouchEvent fired on a {@link pc.ElementComponent}.
     * @extends pc.ElementInputEvent
     * @description Create an instance of a pc.ElementTouchEvent.
     * @param {TouchEvent} event The TouchEvent that was originally raised.
     * @param {pc.ElementComponent} element The ElementComponent that this event was originally raised on.
     * @param {pc.CameraComponent} camera The CameraComponent that this event was originally raised via.
     * @param {Number} x The x coordinate of the touch that triggered the event
     * @param {Number} y The y coordinate of the touch that triggered the event
     * @param {pc.ElementInput} input The pc.ElementInput instance
     * @property {Touch[]} touches The Touch objects representing all current points of contact with the surface, regardless of target or changed status.
     * @property {Touch[]} changedTouches The Touch objects representing individual points of contact whose states changed between the previous touch event and this one.
     */
    class ElementTouchEvent extends pc.ElementInputEvent {
        constructor(event: TouchEvent, element: pc.ElementComponent, camera: pc.CameraComponent, x: number, y: number, input: pc.ElementInput);
        /**
         * @function
         * @name pc.ElementInputEvent#stopPropagation
         * @description Stop propagation of the event to parent {@link pc.ElementComponent}s. This also stops propagation of the event to other event listeners of the original DOM Event.
         */
        stopPropagation(): void;
    }
    /**
     * @constructor
     * @name pc.ElementInput
     * @classdesc Handles mouse and touch events for {@link pc.ElementComponent}s. When input events
     * occur on an ElementComponent this fires the appropriate events on the ElementComponent.
     * @description Create a new pc.ElementInput instance.
     * @param {Element} domElement The DOM element
     * @param {Object} [options] Optional arguments
     * @param {Object} [options.useMouse] Whether to allow mouse input. Defaults to true.
     * @param {Object} [options.useTouch] Whether to allow touch input. Defaults to true.
     */
    class ElementInput {
        constructor(domElement: Element, options?: {
            useMouse?: any;
            useTouch?: any;
        });
        /**
         * @function
         * @name pc.ElementInput#attach
         * @description Attach mouse and touch events to a DOM element.
         * @param {Element} domElement The DOM element
         */
        attach(domElement: Element): void;
        /**
         * @function
         * @name pc.ElementInput#detach
         * @description Remove mouse and touch events from the DOM element that it is attached to
         */
        detach(): void;
        /**
         * @function
         * @name pc.ElementInput#addElement
         * @description Add a {@link pc.ElementComponent} to the internal list of ElementComponents that are being checked for input.
         * @param {pc.ElementComponent} element The ElementComponent
         */
        addElement(element: pc.ElementComponent): void;
        /**
         * @function
         * @name pc.ElementInput#removeElement
         * @description Remove a {@link pc.ElementComponent} from the internal list of ElementComponents that are being checked for input.
         * @param {pc.ElementComponent} element The ElementComponent
         */
        removeElement(element: pc.ElementComponent): void;
    }
    /**
     * @constructor
     * @name pc.GamePads
     * @classdesc Input handler for accessing GamePad input.
     */
    class GamePads {
        /**
         * @function
         * @name pc.GamePads#update
         * @description Update the current and previous state of the gamepads. This must be called every frame for wasPressed()
         * to work
         */
        update(): void;
        /**
         * @function
         * @name pc.GamePads#poll
         * @description Poll for the latest data from the gamepad API.
         * @returns {Object[]} An array of gamepads and mappings for the model of gamepad that is attached
         * @example
         *   var gamepads = new pc.GamePads();
         *   var pads = gamepads.poll();
         *   // pads[0] = { map: <map>, pad: <pad> }
         */
        poll(): object[];
        /**
         * @function
         * @name pc.GamePads#isPressed
         * @description Returns true if the button on the pad requested is pressed
         * @param {Number} index The index of the pad to check, use constants pc.PAD_1, pc.PAD_2, etc
         * @param {Number} button The button to test, use constants pc.PAD_FACE_1, etc
         * @returns {Boolean} True if the button is pressed
         */
        isPressed(index: number, button: number): boolean;
        /**
         * @function
         * @name pc.GamePads#wasPressed
         * @description Returns true if the button was pressed since the last frame
         * @param {Number} index The index of the pad to check, use constants pc.PAD_1, pc.PAD_2, etc
         * @param {Number} button The button to test, use constants pc.PAD_FACE_1, etc
         * @returns {Boolean} True if the button was pressed since the last frame
         */
        wasPressed(index: number, button: number): boolean;
        /**
         * @function
         * @name pc.GamePads#getAxis
         * @description Get the value of one of the analogue axes of the pad
         * @param {Number} index The index of the pad to check, use constants pc.PAD_1, pc.PAD_2, etc
         * @param {Number} axes The axes to get the value of, use constants pc.PAD_L_STICK_X, etc
         * @returns {Number} The value of the axis between -1 and 1.
         */
        getAxis(index: number, axes: number): number;
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_KEYDOWN
     * @description Name of event fired when a key is pressed
     */
    enum EVENT_KEYDOWN {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_KEYUP
     * @description Name of event fired when a key is released
     */
    enum EVENT_KEYUP {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_MOUSEDOWN
     * @description Name of event fired when a mouse button is pressed
     */
    enum EVENT_MOUSEDOWN {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_MOUSEMOVE
     * @description Name of event fired when the mouse is moved
     */
    enum EVENT_MOUSEMOVE {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_MOUSEUP
     * @description Name of event fired when a mouse button is released
     */
    enum EVENT_MOUSEUP {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_MOUSEWHEEL
     * @description Name of event fired when the mouse wheel is rotated
     */
    enum EVENT_MOUSEWHEEL {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_TOUCHSTART
     * @description Name of event fired when a new touch occurs. For example, a finger is placed on the device.
     */
    enum EVENT_TOUCHSTART {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_TOUCHEND
     * @description Name of event fired when touch ends. For example, a finger is lifted off the device.
     */
    enum EVENT_TOUCHEND {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_TOUCHMOVE
     * @description Name of event fired when a touch moves.
     */
    enum EVENT_TOUCHMOVE {
    }
    /**
     * @enum pc.EVENT
     * @name pc.EVENT_TOUCHCANCEL
     * @description Name of event fired when a touch point is interrupted in some way.
     * The exact reasons for cancelling a touch can vary from device to device.
     * For example, a modal alert pops up during the interaction; the touch point leaves the document area;
     * or there are more touch points than the device supports, in which case the earliest touch point is canceled.
     */
    enum EVENT_TOUCHCANCEL {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_BACKSPACE
     */
    enum KEY_BACKSPACE {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_TAB
     */
    enum KEY_TAB {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_RETURN
     */
    enum KEY_RETURN {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_ENTER
     */
    enum KEY_ENTER {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_SHIFT
     */
    enum KEY_SHIFT {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_CONTROL
     */
    enum KEY_CONTROL {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_ALT
     */
    enum KEY_ALT {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_PAUSE
     */
    enum KEY_PAUSE {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_CAPS_LOCK
     */
    enum KEY_CAPS_LOCK {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_ESCAPE
     */
    enum KEY_ESCAPE {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_SPACE
     */
    enum KEY_SPACE {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_PAGE_UP
     */
    enum KEY_PAGE_UP {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_PAGE_DOWN
     */
    enum KEY_PAGE_DOWN {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_END
     */
    enum KEY_END {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_HOME
     */
    enum KEY_HOME {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_LEFT
     */
    enum KEY_LEFT {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_UP
     */
    enum KEY_UP {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_RIGHT
     */
    enum KEY_RIGHT {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_DOWN
     */
    enum KEY_DOWN {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_PRINT_SCREEN
     */
    enum KEY_PRINT_SCREEN {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_INSERT
     */
    enum KEY_INSERT {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_DELETE
     */
    enum KEY_DELETE {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_0
     */
    enum KEY_0 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_1
     */
    enum KEY_1 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_2
     */
    enum KEY_2 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_3
     */
    enum KEY_3 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_4
     */
    enum KEY_4 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_5
     */
    enum KEY_5 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_6
     */
    enum KEY_6 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_7
     */
    enum KEY_7 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_8
     */
    enum KEY_8 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_9
     */
    enum KEY_9 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_SEMICOLON
     */
    enum KEY_SEMICOLON {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_EQUAL
     */
    enum KEY_EQUAL {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_A
     */
    enum KEY_A {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_B
     */
    enum KEY_B {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_C
     */
    enum KEY_C {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_D
     */
    enum KEY_D {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_E
     */
    enum KEY_E {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F
     */
    enum KEY_F {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_G
     */
    enum KEY_G {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_H
     */
    enum KEY_H {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_I
     */
    enum KEY_I {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_J
     */
    enum KEY_J {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_K
     */
    enum KEY_K {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_L
     */
    enum KEY_L {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_M
     */
    enum KEY_M {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_N
     */
    enum KEY_N {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_O
     */
    enum KEY_O {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_P
     */
    enum KEY_P {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_Q
     */
    enum KEY_Q {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_R
     */
    enum KEY_R {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_S
     */
    enum KEY_S {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_T
     */
    enum KEY_T {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_U
     */
    enum KEY_U {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_V
     */
    enum KEY_V {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_W
     */
    enum KEY_W {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_X
     */
    enum KEY_X {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_Y
     */
    enum KEY_Y {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_Z
     */
    enum KEY_Z {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_WINDOWS
     */
    enum KEY_WINDOWS {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_CONTEXT_MENU
     */
    enum KEY_CONTEXT_MENU {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_0
     */
    enum KEY_NUMPAD_0 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_1
     */
    enum KEY_NUMPAD_1 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_2
     */
    enum KEY_NUMPAD_2 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_3
     */
    enum KEY_NUMPAD_3 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_4
     */
    enum KEY_NUMPAD_4 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_5
     */
    enum KEY_NUMPAD_5 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_6
     */
    enum KEY_NUMPAD_6 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_7
     */
    enum KEY_NUMPAD_7 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_8
     */
    enum KEY_NUMPAD_8 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_NUMPAD_9
     */
    enum KEY_NUMPAD_9 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_MULTIPLY
     */
    enum KEY_MULTIPLY {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_ADD
     */
    enum KEY_ADD {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_SEPARATOR
     */
    enum KEY_SEPARATOR {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_SUBTRACT
     */
    enum KEY_SUBTRACT {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_DECIMAL
     */
    enum KEY_DECIMAL {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_DIVIDE
     */
    enum KEY_DIVIDE {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F1
     */
    enum KEY_F1 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F2
     */
    enum KEY_F2 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F3
     */
    enum KEY_F3 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F4
     */
    enum KEY_F4 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F5
     */
    enum KEY_F5 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F6
     */
    enum KEY_F6 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F7
     */
    enum KEY_F7 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F8
     */
    enum KEY_F8 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F9
     */
    enum KEY_F9 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F10
     */
    enum KEY_F10 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F11
     */
    enum KEY_F11 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_F12
     */
    enum KEY_F12 {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_COMMA
     */
    enum KEY_COMMA {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_PERIOD
     */
    enum KEY_PERIOD {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_SLASH
     */
    enum KEY_SLASH {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_OPEN_BRACKET
     */
    enum KEY_OPEN_BRACKET {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_BACK_SLASH
     */
    enum KEY_BACK_SLASH {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_CLOSE_BRACKET
     */
    enum KEY_CLOSE_BRACKET {
    }
    /**
     * @enum pc.KEY
     * @name pc.KEY_META
     */
    enum KEY_META {
    }
    /**
     * @enum pc.MOUSEBUTTON
     * @name pc.MOUSEBUTTON_NONE
     * @description No mouse buttons pressed
     */
    enum MOUSEBUTTON_NONE {
    }
    /**
     * @enum pc.MOUSEBUTTON
     * @name pc.MOUSEBUTTON_LEFT
     * @description The left mouse button
     */
    enum MOUSEBUTTON_LEFT {
    }
    /**
     * @enum pc.MOUSEBUTTON
     * @name pc.MOUSEBUTTON_MIDDLE
     * @description The middle mouse button
     */
    enum MOUSEBUTTON_MIDDLE {
    }
    /**
     * @enum pc.MOUSEBUTTON
     * @name pc.MOUSEBUTTON_RIGHT
     * @description The right mouse button
     */
    enum MOUSEBUTTON_RIGHT {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_1
     * @description Index for pad 1
     */
    enum PAD_1 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_2
     * @description Index for pad 2
     */
    enum PAD_2 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_3
     * @description Index for pad 3
     */
    enum PAD_3 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_4
     * @description Index for pad 4
     */
    enum PAD_4 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_FACE_1
     * @description The first face button, from bottom going clockwise
     */
    enum PAD_FACE_1 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_FACE_2
     * @description The second face button, from bottom going clockwise
     */
    enum PAD_FACE_2 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_FACE_3
     * @description The third face button, from bottom going clockwise
     */
    enum PAD_FACE_3 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_FACE_4
     * @description The fourth face button, from bottom going clockwise
     */
    enum PAD_FACE_4 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_L_SHOULDER_1
     * @description The first shoulder button on the left
     */
    enum PAD_L_SHOULDER_1 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_R_SHOULDER_1
     * @description The first shoulder button on the right
     */
    enum PAD_R_SHOULDER_1 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_L_SHOULDER_2
     * @description The second shoulder button on the left
     */
    enum PAD_L_SHOULDER_2 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_R_SHOULDER_2
     * @description The second shoulder button on the right
     */
    enum PAD_R_SHOULDER_2 {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_SELECT
     * @description The select button
     */
    enum PAD_SELECT {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_START
     * @description The start button
     */
    enum PAD_START {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_L_STICK_BUTTON
     * @description The button when depressing the left analogue stick
     */
    enum PAD_L_STICK_BUTTON {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_R_STICK_BUTTON
     * @description The button when depressing the right analogue stick
     */
    enum PAD_R_STICK_BUTTON {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_UP
     * @description Direction pad up
     */
    enum PAD_UP {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_DOWN
     * @description Direction pad down
     */
    enum PAD_DOWN {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_LEFT
     * @description Direction pad left
     */
    enum PAD_LEFT {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_RIGHT
     * @description Direction pad right
     */
    enum PAD_RIGHT {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_VENDOR
     * @description Vendor specific button
     */
    enum PAD_VENDOR {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_L_STICK_X
     * @description Horizontal axis on the left analogue stick
     */
    enum PAD_L_STICK_X {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_L_STICK_Y
     * @description Vertical axis on the left analogue stick
     */
    enum PAD_L_STICK_Y {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_R_STICK_X
     * @description Horizontal axis on the right analogue stick
     */
    enum PAD_R_STICK_X {
    }
    /**
     * @enum pc.PAD
     * @name pc.PAD_R_STICK_Y
     * @description Vertical axis on the right analogue stick
     */
    enum PAD_R_STICK_Y {
    }
    /**
     * @constructor
     * @name pc.KeyboardEvent
     * @classdesc The KeyboardEvent is passed into all event callbacks from the {@link pc.Keyboard}. It corresponds to a key press or release.
     * @description Create a new KeyboardEvent
     * @param {pc.Keyboard} keyboard The keyboard object which is firing the event.
     * @param {KeyboardEvent} event The original browser event that was fired.
     * @property {Number} key The keyCode of the key that has changed. See the pc.KEY_* constants.
     * @property {Element} element The element that fired the keyboard event.
     * @property {KeyboardEvent} event The original browser event which was fired.
     * @example
     * var onKeyDown = function (e) {
     *     if (e.key === pc.KEY_SPACE) {
     *         // space key pressed
     *     }
     *     e.event.preventDefault(); // Use original browser event to prevent browser action.
     * };
     * app.keyboard.on("keydown", onKeyDown, this);
     */
    class KeyboardEvent {
        constructor(keyboard: pc.Keyboard, event: KeyboardEvent);
    }
    /**
     * @constructor
     * @name pc.Keyboard
     * @classdesc A Keyboard device bound to an Element. Allows you to detect the state of the key presses.
     * Note, Keyboard object must be attached to an Element before it can detect any key presses.
     * @description Create a new Keyboard object
     * @param {Element} [element] Element to attach Keyboard to. Note that elements like &lt;div&gt; can't
     * accept focus by default. To use keyboard events on an element like this it must have a value of 'tabindex' e.g. tabindex="0". For more details: <a href="http://www.w3.org/WAI/GL/WCAG20/WD-WCAG20-TECHS/SCR29.html">http://www.w3.org/WAI/GL/WCAG20/WD-WCAG20-TECHS/SCR29.html</a>
     * @param {Object} [options] Optional options object.
     * @param {Boolean} [options.preventDefault] Call preventDefault() in key event handlers. This stops the default action of the event occurring. e.g. Ctrl+T will not open a new browser tab
     * @param {Boolean} [options.stopPropagation] Call stopPropagation() in key event handlers. This stops the event bubbling up the DOM so no parent handlers will be notified of the event
     * @example
     * var keyboard = new pc.Keyboard(window); // attach keyboard listeners to the window
     */
    class Keyboard {
        constructor(element?: Element, options?: {
            preventDefault?: boolean;
            stopPropagation?: boolean;
        });
        /**
         * @function
         * @name pc.Keyboard#attach
         * @description Attach the keyboard event handlers to an Element
         * @param {Element} element The element to listen for keyboard events on.
         */
        attach(element: Element): void;
        /**
         * @function
         * @name pc.Keyboard#detach
         * @description Detach the keyboard event handlers from the element it is attached to.
         */
        detach(): void;
        /**
         * @function
         * @name pc.Keyboard#isPressed
         * @description Return true if the key is currently down.
         * @param {Number} key The keyCode of the key to test. See the pc.KEY_* constants.
         * @returns {Boolean} True if the key was pressed, false if not.
         */
        isPressed(key: number): boolean;
        /**
         * @function
         * @name pc.Keyboard#wasPressed
         * @description Returns true if the key was pressed since the last update.
         * @param {Number} key The keyCode of the key to test. See the pc.KEY_* constants.
         * @returns {Boolean} true if the key was pressed.
         */
        wasPressed(key: number): boolean;
        /**
         * @function
         * @name pc.Keyboard#wasReleased
         * @description Returns true if the key was released since the last update.
         * @param {Number} key The keyCode of the key to test. See the pc.KEY_* constants.
         * @returns {Boolean} true if the key was pressed.
         */
        wasReleased(key: number): boolean;
    }
    /**
     * @constructor
     * @name pc.MouseEvent
     * @classdesc MouseEvent object that is passed to events 'mousemove', 'mouseup', 'mousedown' and 'mousewheel'.
     * @description Create an new MouseEvent
     * @param {pc.Mouse} mouse The Mouse device that is firing this event
     * @param {MouseEvent} event The original browser event that fired
     * @property {Number} x The x co-ordinate of the mouse pointer relative to the element pc.Mouse is attached to
     * @property {Number} y The y co-ordinate of the mouse pointer relative to the element pc.Mouse is attached to
     * @property {Number} dx The change in x co-ordinate since the last mouse event
     * @property {Number} dy The change in y co-ordinate since the last mouse event
     * @property {Number} button The mouse button associated with this event. Can be:
     * <ul>
     *     <li>{@link pc.MOUSEBUTTON_LEFT}</li>
     *     <li>{@link pc.MOUSEBUTTON_MIDDLE}</li>
     *     <li>{@link pc.MOUSEBUTTON_RIGHT}</li>
     * </ul>
     * @property {Number} wheel A value representing the amount the mouse wheel has moved, only valid for {@link mousemove} events
     * @property {Element} element The element that the mouse was fired from
     * @property {Boolean} ctrlKey True if the ctrl key was pressed when this event was fired
     * @property {Boolean} shiftKey True if the shift key was pressed when this event was fired
     * @property {Boolean} altKey True if the alt key was pressed when this event was fired
     * @property {Boolean} metaKey True if the meta key was pressed when this event was fired
     * @property {MouseEvent} event The original browser event
     * @since 0.88.0
     */
    class MouseEvent {
        constructor(mouse: pc.Mouse, event: MouseEvent);
    }
    /**
     * @constructor
     * @name pc.Mouse
     * @classdesc A Mouse Device, bound to a DOM Element.
     * @description Create a new Mouse device
     * @param {Element} [element] The Element that the mouse events are attached to
     */
    class Mouse {
        constructor(element?: Element);
        /**
         * @function
         * @name pc.Mouse.isPointerLocked
         * @description Check if the mouse pointer has been locked, using {@link pc.Mouse#enabledPointerLock}
         * @returns {Boolean} True if locked
         */
        static isPointerLocked(): boolean;
        /**
         * @function
         * @name pc.Mouse#attach
         * @description Attach mouse events to an Element.
         * @param {Element} element The DOM element to attach the mouse to.
         */
        attach(element: Element): void;
        /**
         * @function
         * @name pc.Mouse#detach
         * @description Remove mouse events from the element that it is attached to
         */
        detach(): void;
        /**
         * @function
         * @name pc.Mouse#disableContextMenu
         * @description Disable the context menu usually activated with right-click
         */
        disableContextMenu(): void;
        /**
         * @function
         * @name pc.Mouse#enableContextMenu
         * @description Enable the context menu usually activated with right-click. This option is active by default.
         */
        enableContextMenu(): void;
        /**
         * @function
         * @name pc.Mouse#enablePointerLock
         * @description Request that the browser hides the mouse cursor and locks the mouse to the element.
         * Allowing raw access to mouse movement input without risking the mouse exiting the element.
         * Notes: <br />
         * <ul>
         * <li>In some browsers this will only work when the browser is running in fullscreen mode. See {@link pc.Application#enableFullscreen}
         * <li>Enabling pointer lock can only be initiated by a user action e.g. in the event handler for a mouse or keyboard input.
         * </ul>
         * @param {Function} [success] Function called if the request for mouse lock is successful.
         * @param {Function} [error] Function called if the request for mouse lock is unsuccessful.
         */
        enablePointerLock(success?: (...params: any[]) => any, error?: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.Mouse#disablePointerLock
         * @description Return control of the mouse cursor to the user
         * @param {Function} [success] Function called when the mouse lock is disabled
         */
        disablePointerLock(success?: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.Mouse#update
         * @description Update method, should be called once per frame
         */
        update(): void;
        /**
         * @function
         * @name pc.Mouse#isPressed
         * @description Returns true if the mouse button is currently pressed
         * @param {Number} button The mouse button to test. Can be:
         * <ul>
         *     <li>{@link pc.MOUSEBUTTON_LEFT}</li>
         *     <li>{@link pc.MOUSEBUTTON_MIDDLE}</li>
         *     <li>{@link pc.MOUSEBUTTON_RIGHT}</li>
         * </ul>
         * @returns {Boolean} True if the mouse button is current pressed
         */
        isPressed(button: number): boolean;
        /**
         * @function
         * @name pc.Mouse#wasPressed
         * @description Returns true if the mouse button was pressed this frame (since the last call to update).
         * @param {Number} button The mouse button to test. Can be:
         * <ul>
         *     <li>{@link pc.MOUSEBUTTON_LEFT}</li>
         *     <li>{@link pc.MOUSEBUTTON_MIDDLE}</li>
         *     <li>{@link pc.MOUSEBUTTON_RIGHT}</li>
         * </ul>
         * @returns {Boolean} True if the mouse button was pressed since the last update
         */
        wasPressed(button: number): boolean;
        /**
         * @function
         * @name pc.Mouse#wasReleased
         * @description Returns true if the mouse button was released this frame (since the last call to update).
         * @param {Number} button The mouse button to test. Can be:
         * <ul>
         *     <li>{@link pc.MOUSEBUTTON_LEFT}</li>
         *     <li>{@link pc.MOUSEBUTTON_MIDDLE}</li>
         *     <li>{@link pc.MOUSEBUTTON_RIGHT}</li>
         * </ul>
         * @returns {Boolean} True if the mouse button was released since the last update
         */
        wasReleased(button: number): boolean;
    }
    /**
     * @constructor
     * @name pc.Touch
     * @classdesc A instance of a single point touch on a {@link pc.TouchDevice}
     * @description Create a new Touch object from the browser Touch
     * @param {Touch} touch The browser Touch object
     * @property {Number} id The identifier of the touch
     * @property {Number} x The x co-ordinate relative to the element that the TouchDevice is attached to
     * @property {Number} y The y co-ordinate relative to the element that the TouchDevice is attached to
     * @property {Element} target The target element of the touch event
     * @property {Touch} touch The original browser Touch object
     */
    class Touch {
        constructor(touch: Touch);
    }
    /**
     * @constructor
     * @name pc.TouchEvent
     * @classdesc A Event corresponding to touchstart, touchend, touchmove or touchcancel. TouchEvent wraps the standard
     * browser event and provides lists of {@link pc.Touch} objects.
     * @description Create a new TouchEvent from an existing browser event
     * @param {pc.TouchDevice} device The source device of the touch events
     * @param {TouchEvent} event The original browser TouchEvent
     * @property {Element} element The target Element that the event was fired from
     * @property {pc.Touch[]} touches A list of all touches currently in contact with the device
     * @property {pc.Touch[]} changedTouches A list of touches that have changed since the last event
     */
    class TouchEvent {
        constructor(device: pc.TouchDevice, event: TouchEvent);
        /**
         * @function
         * @name pc.TouchEvent#getTouchById
         * @description Get an event from one of the touch lists by the id. It is useful to access
         * touches by their id so that you can be sure you are referencing the same touch.
         * @param {Number} id The identifier of the touch.
         * @param {pc.Touch[]} list An array of touches to search.
         * @returns {pc.Touch} The {@link pc.Touch} object or null.
         */
        getTouchById(id: number, list: pc.Touch[]): pc.Touch;
    }
    /**
     * @constructor
     * @name pc.TouchDevice
     * @classdesc Attach a TouchDevice to an element and it will receive and fire events when the element is touched.
     * See also {@link pc.Touch} and {@link pc.TouchEvent}
     * @description Create a new touch device and attach it to an element
     * @param {Element} element The element to attach listen for events on
     */
    class TouchDevice {
        constructor(element: Element);
        /**
         * @function
         * @name pc.TouchDevice#attach
         * @description Attach a device to an element in the DOM.
         * If the device is already attached to an element this method will detach it first
         * @param {Element} element The element to attach to
         */
        attach(element: Element): void;
        /**
         * @function
         * @name pc.TouchDevice#detach
         * @description Detach a device from the element it is attached to
         */
        detach(): void;
    }
    /**
     * @function
     * @name pc.getTouchTargetCoords
     * @description Similiar to {@link pc.getTargetCoords} for the MouseEvents.
     * This function takes a browser Touch object and returns the co-ordinates of the
     * touch relative to the target element.
     * @param {Touch} touch The browser Touch object
     * @returns {Object} The co-ordinates of the touch relative to the touch.target element. In the format {x, y}
     */
    function getTouchTargetCoords(touch: Touch): any;
    /**
     * @constructor
     * @name pc.CurveSet
     * @classdesc A curve set is a collection of curves.
     * @description Creates a new curve set.
     * @param {Array<Number[]>} [curveKeys] An array of arrays of keys (pairs of numbers with
     * the time first and value second).
     */
    class CurveSet {
        constructor(curveKeys?: Number[][]);
        /**
         * @function
         * @name pc.CurveSet#get
         * @description Return a specific curve in the curve set.
         * @param {Number} index The index of the curve to return
         * @returns {pc.Curve} The curve at the specified index
         */
        get(index: number): pc.Curve;
        /**
         * @function
         * @name pc.CurveSet#value
         * @description Returns the interpolated value of all curves in the curve
         * set at the specified time.
         * @param {Number} time The time at which to calculate the value
         * @param {Number[]} [result] The interpolated curve values at the specified time.
         * If this parameter is not supplied, the function allocates a new array internally
         * to return the result.
         * @returns {Number[]} The interpolated curve values at the specified time
         */
        value(time: number, result?: Number[]): Number[];
        /**
         * @function
         * @name pc.CurveSet#clone
         * @description Returns a clone of the specified curve set object.
         * @returns {pc.CurveSet} A clone of the specified curve set
         */
        clone(): pc.CurveSet;
        /**
         * @readonly
         * @name pc.CurveSet#length
         * @type Number
         * @description The number of curves in the curve set.
         */
        readonly length: number;
        /**
         * @name pc.CurveSet#type
         * @type Number
         * @description The interpolation scheme applied to all curves in the curve set. Can be:
         * <ul>
         *     <li>pc.CURVE_LINEAR</li>
         *     <li>pc.CURVE_SMOOTHSTEP</li>
         *     <li>pc.CURVE_CATMULL</li>
         *     <li>pc.CURVE_CARDINAL</li>
         * </ul>
         */
        type: number;
    }
    /**
     * @enum pc.CURVE
     * @name pc.CURVE_LINEAR
     * @description A linear interpolation scheme.
     */
    enum CURVE_LINEAR {
    }
    /**
     * @enum pc.CURVE
     * @name pc.CURVE_SMOOTHSTEP
     * @description A smooth step interpolation scheme.
     */
    enum CURVE_SMOOTHSTEP {
    }
    /**
     * @deprecated
     * @enum pc.CURVE
     * @name pc.CURVE_CATMULL
     * @description A Catmull-Rom spline interpolation scheme. This interpolation scheme is deprecated. Use CURVE_SPLINE instead.
     */
    enum CURVE_CATMULL {
    }
    /**
     * @deprecated
     * @enum pc.CURVE
     * @name pc.CURVE_CARDINAL
     * @description A cardinal spline interpolation scheme. This interpolation scheme is deprecated. Use CURVE_SPLINE instead.
     */
    enum CURVE_CARDINAL {
    }
    /**
     * @enum pc.CURVE
     * @name pc.CURVE_SPLINE
     * @description Cardinal spline interpolation scheme. For Catmull-Rom, specify curve tension 0.5.
     */
    enum CURVE_SPLINE {
    }
    /**
     * @enum pc.CURVE
     * @name pc.CURVE_STEP
     * @description A stepped interpolater, free from the shackles of blending.
     */
    enum CURVE_STEP {
    }
    /**
     * @constructor
     * @name pc.Curve
     * @classdesc A curve is a collection of keys (time/value pairs). The shape of the
     * curve is defined by its type that specifies an interpolation scheme for the keys.
     * @description Creates a new curve.
     * @param {Number[]} [data] An array of keys (pairs of numbers with the time first and
     * value second)
     * @property {Number} length The number of keys in the curve. [read only]
     */
    class Curve {
        constructor(data?: Number[]);
        /**
         * @function
         * @name pc.Curve#add
         * @description Add a new key to the curve.
         * @param {Number} time Time to add new key
         * @param {Number} value Value of new key
         * @returns {Number[]} [time, value] pair
         */
        add(time: number, value: number): Number[];
        /**
         * @function
         * @name pc.Curve#get
         * @description Return a specific key.
         * @param {Number} index The index of the key to return
         * @returns {Number[]} The key at the specified index
         */
        get(index: number): Number[];
        /**
         * @function
         * @name pc.Curve#sort
         * @description Sort keys by time.
         */
        sort(): void;
        /**
         * @function
         * @name pc.Curve#value
         * @description Returns the interpolated value of the curve at specified time.
         * @param {Number} time The time at which to calculate the value
         * @returns {Number} The interpolated value
         */
        value(time: number): number;
        /**
         * @function
         * @name pc.Curve#clone
         * @description Returns a clone of the specified curve object.
         * @returns {pc.Curve} A clone of the specified curve
         */
        clone(): pc.Curve;
    }
    /**
     * @constructor
     * @name pc.Mat3
     * @classdesc A 3x3 matrix.
     * @description Creates a new identity Mat3 object.
     */
    class Mat3 {
        /**
         * @function
         * @name pc.Mat3#clone
         * @description Creates a duplicate of the specified matrix.
         * @returns {pc.Mat3} A duplicate matrix.
         * @example
         * var src = new pc.Mat3().translate(10, 20, 30);
         * var dst = src.clone();
         * console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
         */
        clone(): pc.Mat3;
        /**
         * @function
         * @name pc.Mat3#copy
         * @description Copies the contents of a source 3x3 matrix to a destination 3x3 matrix.
         * @param {pc.Mat3} rhs A 3x3 matrix to be copied.
         * @returns {pc.Mat3} Self for chaining
         * @example
         * var src = new pc.Mat3().translate(10, 20, 30);
         * var dst = new pc.Mat3();
         * dst.copy(src);
         * console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
         */
        copy(rhs: pc.Mat3): pc.Mat3;
        /**
         * @function
         * @name pc.Mat3#set
         * @description Copies the contents of a source array[9] to a destination 3x3 matrix.
         * @param {Number[]} src An array[9] to be copied.
         * @returns {pc.Mat3} Self for chaining
         * @example
         * var dst = new pc.Mat3();
         * dst.set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
         */
        set(src: Number[]): pc.Mat3;
        /**
         * @function
         * @name pc.Mat3#equals
         * @param {pc.Mat3} rhs The other matrix.
         * @description Reports whether two matrices are equal.
         * @returns {Boolean} true if the matrices are equal and false otherwise.
         * @example
         * var a = new pc.Mat3().translate(10, 20, 30);
         * var b = new pc.Mat3();
         * console.log("The two matrices are " + (a.equals(b) ? "equal" : "different"));
         */
        equals(rhs: pc.Mat3): boolean;
        /**
         * @function
         * @name pc.Mat3#isIdentity
         * @description Reports whether the specified matrix is the identity matrix.
         * @returns {Boolean} true if the matrix is identity and false otherwise.
         * @example
         * var m = new pc.Mat3();
         * console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
         */
        isIdentity(): boolean;
        /**
         * @function
         * @name pc.Mat3#setIdentity
         * @description Sets the matrix to the identity matrix.
         * @returns {pc.Mat3} Self for chaining.
         * @example
         * m.setIdentity();
         * console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
         */
        setIdentity(): pc.Mat3;
        /**
         * @function
         * @name pc.Mat3#toString
         * @description Converts the matrix to string form.
         * @returns {String} The matrix in string form.
         * @example
         * var m = new pc.Mat3();
         * // Should output '[1, 0, 0, 0, 1, 0, 0, 0, 1]'
         * console.log(m.toString());
         */
        toString(): string;
        /**
         * @function
         * @name pc.Mat3#transpose
         * @description Generates the transpose of the specified 3x3 matrix.
         * @returns {pc.Mat3} Self for chaining.
         * @example
         * var m = new pc.Mat3();
         *
         * // Transpose in place
         * m.transpose();
         */
        transpose(): pc.Mat3;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Mat3
         * @name pc.Mat3.IDENTITY
         * @description A constant matrix set to the identity.
         */
        static readonly IDENTITY: pc.Mat3;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Mat3
         * @name pc.Mat3.ZERO
         * @description A constant matrix with all elements set to 0.
         */
        static readonly ZERO: pc.Mat3;
    }
    /**
     * @constructor
     * @name pc.Mat4
     * @classdesc A 4x4 matrix.
     * @description Creates a new identity Mat4 object.
     */
    class Mat4 {
        /**
         * @function
         * @name pc.Mat4#add2
         * @description Adds the specified 4x4 matrices together and stores the result in
         * the current instance.
         * @param {pc.Mat4} lhs The 4x4 matrix used as the first operand of the addition.
         * @param {pc.Mat4} rhs The 4x4 matrix used as the second operand of the addition.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var m = new pc.Mat4();
         *
         * m.add2(pc.Mat4.IDENTITY, pc.Mat4.ONE);
         *
         * console.log("The result of the addition is: " a.toString());
         */
        add2(lhs: pc.Mat4, rhs: pc.Mat4): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#add
         * @description Adds the specified 4x4 matrix to the current instance.
         * @param {pc.Mat4} rhs The 4x4 matrix used as the second operand of the addition.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var m = new pc.Mat4();
         *
         * m.add(pc.Mat4.ONE);
         *
         * console.log("The result of the addition is: " a.toString());
         */
        add(rhs: pc.Mat4): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#clone
         * @description Creates a duplicate of the specified matrix.
         * @returns {pc.Mat4} A duplicate matrix.
         * @example
         * var src = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         * var dst = src.clone();
         * console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
         */
        clone(): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#copy
         * @description Copies the contents of a source 4x4 matrix to a destination 4x4 matrix.
         * @param {pc.Mat4} rhs A 4x4 matrix to be copied.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var src = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         * var dst = new pc.Mat4();
         * dst.copy(src);
         * console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
         */
        copy(rhs: pc.Mat4): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#equals
         * @description Reports whether two matrices are equal.
         * @param {pc.Mat4} rhs The other matrix.
         * @returns {Boolean} true if the matrices are equal and false otherwise.
         * @example
         * var a = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         * var b = new pc.Mat4();
         * console.log("The two matrices are " + (a.equals(b) ? "equal" : "different"));
         */
        equals(rhs: pc.Mat4): boolean;
        /**
         * @function
         * @name pc.Mat4#isIdentity
         * @description Reports whether the specified matrix is the identity matrix.
         * @returns {Boolean} true if the matrix is identity and false otherwise.
         * @example
         * var m = new pc.Mat4();
         * console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
         */
        isIdentity(): boolean;
        /**
         * @function
         * @name pc.Mat4#mul2
         * @description Multiplies the specified 4x4 matrices together and stores the result in
         * the current instance.
         * @param {pc.Mat4} lhs The 4x4 matrix used as the first multiplicand of the operation.
         * @param {pc.Mat4} rhs The 4x4 matrix used as the second multiplicand of the operation.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var a = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         * var b = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
         * var r = new pc.Mat4();
         *
         * // r = a * b
         * r.mul2(a, b);
         *
         * console.log("The result of the multiplication is: " r.toString());
         */
        mul2(lhs: pc.Mat4, rhs: pc.Mat4): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#mul
         * @description Multiplies the current instance by the specified 4x4 matrix.
         * @param {pc.Mat4} rhs The 4x4 matrix used as the second multiplicand of the operation.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var a = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         * var b = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
         *
         * // a = a * b
         * a.mul(b);
         *
         * console.log("The result of the multiplication is: " a.toString());
         */
        mul(rhs: pc.Mat4): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#transformPoint
         * @description Transforms a 3-dimensional point by a 4x4 matrix.
         * @param {pc.Vec3} vec The 3-dimensional point to be transformed.
         * @param {pc.Vec3} [res] An optional 3-dimensional point to receive the result of the transformation.
         * @returns {pc.Vec3} The input point v transformed by the current instance.
         * @example
         * // Create a 3-dimensional point
         * var v = new pc.Vec3(1, 2, 3);
         *
         * // Create a 4x4 rotation matrix
         * var m = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         *
         * var tv = m.transformPoint(v);
         */
        transformPoint(vec: pc.Vec3, res?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#transformVector
         * @description Transforms a 3-dimensional vector by a 4x4 matrix.
         * @param {pc.Vec3} vec The 3-dimensional vector to be transformed.
         * @param {pc.Vec3} [res] An optional 3-dimensional vector to receive the result of the transformation.
         * @returns {pc.Vec3} The input vector v transformed by the current instance.
         * @example
         * // Create a 3-dimensional vector
         * var v = new pc.Vec3(1, 2, 3);
         *
         * // Create a 4x4 rotation matrix
         * var m = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         *
         * var tv = m.transformVector(v);
         */
        transformVector(vec: pc.Vec3, res?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#transformVec4
         * @description Transforms a 4-dimensional vector by a 4x4 matrix.
         * @param {pc.Vec4} vec The 4-dimensional vector to be transformed.
         * @param {pc.Vec4} [res] An optional 4-dimensional vector to receive the result of the transformation.
         * @returns {pc.Vec4} The input vector v transformed by the current instance.
         * @example
         * // Create an input 4-dimensional vector
         * var v = new pc.Vec4(1, 2, 3, 4);
         *
         * // Create an output 4-dimensional vector
         * var result = new pc.Vec4();
         *
         * // Create a 4x4 rotation matrix
         * var m = new pc.Mat4().setFromEulerAngles(10, 20, 30);
         *
         * m.transformVec4(v, result);
         */
        transformVec4(vec: pc.Vec4, res?: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Mat4#setLookAt
         * @description Sets the specified matrix to a viewing matrix derived from an eye point, a target point
         * and an up vector. The matrix maps the target point to the negative z-axis and the eye point to the
         * origin, so that when you use a typical projection matrix, the center of the scene maps to the center
         * of the viewport. Similarly, the direction described by the up vector projected onto the viewing plane
         * is mapped to the positive y-axis so that it points upward in the viewport. The up vector must not be
         * parallel to the line of sight from the eye to the reference point.
         * @param {pc.Vec3} position 3-d vector holding view position.
         * @param {pc.Vec3} target 3-d vector holding reference point.
         * @param {pc.Vec3} up 3-d vector holding the up direction.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var position = new pc.Vec3(10, 10, 10);
         * var target = new pc.Vec3(0, 0, 0);
         * var up = new pc.Vec3(0, 1, 0);
         * var m = new pc.Mat4().setLookAt(position, target, up);
         */
        setLookAt(position: pc.Vec3, target: pc.Vec3, up: pc.Vec3): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#setPerspective
         * @description Sets the specified matrix to a perspective projection matrix. The function's
         * parameters define the shape of a frustum.
         * @param {Number} fov The frustum's field of view in degrees. The fovIsHorizontal parameter
         * controls whether this is a vertical or horizontal field of view. By default, it's a vertical
         * field of view.
         * @param {Number} aspect The aspect ratio of the frustum's projection plane (width / height).
         * @param {Number} znear The near clip plane in eye coordinates.
         * @param {Number} zfar The far clip plane in eye coordinates.
         * @param {Boolean} [fovIsHorizontal=false] Set to true to treat the fov as horizontal (x-axis)
         * and false for vertical (y-axis). Defaults to false.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * // Create a 4x4 perspective projection matrix
         * var persp = pc.Mat4().setPerspective(45, 16 / 9, 1, 1000);
         */
        setPerspective(fov: number, aspect: number, znear: number, zfar: number, fovIsHorizontal?: boolean): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#setOrtho
         * @description Sets the specified matrix to an orthographic projection matrix. The function's parameters
         * define the shape of a cuboid-shaped frustum.
         * @param {Number} left The x-coordinate for the left edge of the camera's projection plane in eye space.
         * @param {Number} right The x-coordinate for the right edge of the camera's projection plane in eye space.
         * @param {Number} bottom The y-coordinate for the bottom edge of the camera's projection plane in eye space.
         * @param {Number} top The y-coordinate for the top edge of the camera's projection plane in eye space.
         * @param {Number} near The near clip plane in eye coordinates.
         * @param {Number} far The far clip plane in eye coordinates.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * // Create a 4x4 orthographic projection matrix
         * var ortho = pc.Mat4().ortho(-2, 2, -2, 2, 1, 1000);
         */
        setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#setFromAxisAngle
         * @description Sets the specified matrix to a rotation matrix equivalent to a rotation around
         * an axis. The axis must be normalized (unit length) and the angle must be specified in degrees.
         * @param {pc.Vec3} axis The normalized axis vector around which to rotate.
         * @param {Number} angle The angle of rotation in degrees.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * // Create a 4x4 rotation matrix
         * var rm = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 90);
         */
        setFromAxisAngle(axis: pc.Vec3, angle: number): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#invert
         * @description Sets the specified matrix to its inverse.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
         * var rot = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
         *
         * // Invert in place
         * rot.invert();
         */
        invert(): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#set
         * @description Sets matrix data from an array.
         * @param {Number[]} src Source array. Must have 16 values.
         * @returns {pc.Mat4} Self for chaining.
         */
        set(src: Number[]): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#setIdentity
         * @description Sets the specified matrix to the identity matrix.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * m.setIdentity();
         * console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
         */
        setIdentity(): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#setTRS
         * @description Sets the specified matrix to the concatenation of a translation, a
         * quaternion rotation and a scale.
         * @param {pc.Vec3} t A 3-d vector translation.
         * @param {pc.Quat} r A quaternion rotation.
         * @param {pc.Vec3} s A 3-d vector scale.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var t = new pc.Vec3(10, 20, 30);
         * var r = new pc.Quat();
         * var s = new pc.Vec3(2, 2, 2);
         *
         * var m = new pc.Mat4();
         * m.setTRS(t, r, s);
         */
        setTRS(t: pc.Vec3, r: pc.Quat, s: pc.Vec3): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#transpose
         * @description Sets the specified matrix to its transpose.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var m = new pc.Mat4();
         *
         * // Transpose in place
         * m.transpose();
         */
        transpose(): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#getTranslation
         * @description Extracts the translational component from the specified 4x4 matrix.
         * @param {pc.Vec3} [t] The vector to receive the translation of the matrix.
         * @returns {pc.Vec3} The translation of the specified 4x4 matrix.
         * @example
         * // Create a 4x4 matrix
         * var m = new pc.Mat4();
         *
         * // Query the z-axis component
         * var t = new pc.Vec3();
         * m.getTranslation(t);
         */
        getTranslation(t?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#getX
         * @description Extracts the x-axis from the specified 4x4 matrix.
         * @param {pc.Vec3} [x] The vector to receive the x axis of the matrix.
         * @returns {pc.Vec3} The x-axis of the specified 4x4 matrix.
         * @example
         * // Create a 4x4 matrix
         * var m = new pc.Mat4();
         *
         * // Query the z-axis component
         * var x = new pc.Vec3();
         * m.getX(x);
         */
        getX(x?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#getY
         * @description Extracts the y-axis from the specified 4x4 matrix.
         * @param {pc.Vec3} [y] The vector to receive the y axis of the matrix.
         * @returns {pc.Vec3} The y-axis of the specified 4x4 matrix.
         * @example
         * // Create a 4x4 matrix
         * var m = new pc.Mat4();
         *
         * // Query the z-axis component
         * var y = new pc.Vec3();
         * m.getY(y);
         */
        getY(y?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#getZ
         * @description Extracts the z-axis from the specified 4x4 matrix.
         * @param {pc.Vec3} [z] The vector to receive the z axis of the matrix.
         * @returns {pc.Vec3} The z-axis of the specified 4x4 matrix.
         * @example
         * // Create a 4x4 matrix
         * var m = new pc.Mat4();
         *
         * // Query the z-axis component
         * var z = new pc.Vec3();
         * m.getZ(z);
         */
        getZ(z?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#getScale
         * @description Extracts the scale component from the specified 4x4 matrix.
         * @param {pc.Vec3} [scale] Vector to receive the scale.
         * @returns {pc.Vec3} The scale in X, Y and Z of the specified 4x4 matrix.
         * @example
         * // Create a 4x4 scale matrix
         * var m = new pc.Mat4().scale(2, 3, 4);
         *
         * // Query the scale component
         * var scale = m.getScale();
         */
        getScale(scale?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#setFromEulerAngles
         * @description Sets the specified matrix to a rotation matrix defined by
         * Euler angles. The Euler angles are specified in XYZ order and in degrees.
         * @param {Number} ex Angle to rotate around X axis in degrees.
         * @param {Number} ey Angle to rotate around Y axis in degrees.
         * @param {Number} ez Angle to rotate around Z axis in degrees.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var m = new pc.Mat4();
         * m.setFromEulerAngles(45, 90, 180);
         */
        setFromEulerAngles(ex: number, ey: number, ez: number): pc.Mat4;
        /**
         * @function
         * @name pc.Mat4#getEulerAngles
         * @description Extracts the Euler angles equivalent to the rotational portion
         * of the specified matrix. The returned Euler angles are in XYZ order an in degrees.
         * @param {pc.Vec3} [eulers] A 3-d vector to receive the Euler angles.
         * @returns {pc.Vec3} A 3-d vector containing the Euler angles.
         * @example
         * // Create a 4x4 rotation matrix of 45 degrees around the y-axis
         * var m = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 45);
         *
         * var eulers = m.getEulerAngles();
         */
        getEulerAngles(eulers?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Mat4#toString
         * @description Converts the specified matrix to string form.
         * @returns {String} The matrix in string form.
         * @example
         * var m = new pc.Mat4();
         * // Should output '[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]'
         * console.log(m.toString());
         */
        toString(): string;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Mat4
         * @name pc.Mat4.IDENTITY
         * @description A constant matrix set to the identity.
         */
        static readonly IDENTITY: pc.Mat4;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Mat4
         * @name pc.Mat4.ZERO
         * @description A constant matrix with all elements set to 0.
         */
        static readonly ZERO: pc.Mat4;
    }
    /**
     * @name pc.math
     * @namespace
     * @description Math API
     */
    namespace math {
        /**
         * @name pc.math.DEG_TO_RAD
         * @description Conversion factor between degrees and radians
         * @type Number
         * @example
         * // Convert 180 degrees to pi radians
         * var rad = 180 * pc.math.DEG_TO_RAD;
         */
        var DEG_TO_RAD: number;
        /**
         * @name pc.math.RAD_TO_DEG
         * @description Conversion factor between degrees and radians
         * @type Number
         * @example
         * // Convert pi radians to 180 degrees
         * var deg = Math.PI * pc.math.RAD_TO_DEG;
         */
        var RAD_TO_DEG: number;
        /**
         * @function
         * @name pc.math.clamp
         * @description Clamp a number between min and max inclusive.
         * @param {Number} value Number to clamp
         * @param {Number} min Min value
         * @param {Number} max Max value
         * @returns {Number} The clamped value
         */
        function clamp(value: number, min: number, max: number): number;
        /**
         * @function
         * @name pc.math.intToBytes24
         * @description Convert an 24 bit integer into an array of 3 bytes.
         * @param {Number} i Number holding an integer value
         * @returns {Number[]} An array of 3 bytes.
         * @example
         * // Set bytes to [0x11, 0x22, 0x33]
         * var bytes = pc.math.intToBytes24(0x112233);
         */
        function intToBytes24(i: number): Number[];
        /**
         * @function
         * @name pc.math.intToBytes32
         * @description Convert an 32 bit integer into an array of 4 bytes.
         * @returns {Number[]} An array of 4 bytes
         * @param {Number} i Number holding an integer value
         * @example
         * // Set bytes to [0x11, 0x22, 0x33, 0x44]
         * var bytes = pc.math.intToBytes32(0x11223344);
         */
        function intToBytes32(i: number): Number[];
        /**
         * @function
         * @name pc.math.bytesToInt24
         * @description Convert 3 8 bit Numbers into a single unsigned 24 bit Number.
         * @example
         * // Set result1 to 0x112233 from an array of 3 values
         * var result1 = pc.math.bytesToInt24([0x11, 0x22, 0x33]);
         *
         * // Set result2 to 0x112233 from 3 discrete values
         * var result2 = pc.math.bytesToInt24(0x11, 0x22, 0x33);
         * @param {Number} r A single byte (0-255)
         * @param {Number} g A single byte (0-255)
         * @param {Number} b A single byte (0-255)
         * @returns {Number} A single unsigned 24 bit Number.
         */
        function bytesToInt24(r: number, g: number, b: number): number;
        /**
         * @function
         * @name pc.math.bytesToInt32
         * @description Convert 4 1-byte Numbers into a single unsigned 32bit Number.
         * @returns {Number} A single unsigned 32bit Number.
         * @example
         * // Set result1 to 0x11223344 from an array of 4 values
         * var result1 = pc.math.bytesToInt32([0x11, 0x22, 0x33, 0x44]);
         *
         * // Set result2 to 0x11223344 from 4 discrete values
         * var result2 = pc.math.bytesToInt32(0x11, 0x22, 0x33, 0x44);
         * @param {Number} r A single byte (0-255)
         * @param {Number} g A single byte (0-255)
         * @param {Number} b A single byte (0-255)
         * @param {Number} a A single byte (0-255)
         */
        function bytesToInt32(r: number, g: number, b: number, a: number): number;
        /**
         * @function
         * @name pc.math.lerp
         * @returns {Number} The linear interpolation of two numbers.
         * @description Calculates the linear interpolation of two numbers.
         * @param {Number} a Number to linearly interpolate from.
         * @param {Number} b Number to linearly interpolate to.
         * @param {Number} alpha The value controlling the result of interpolation. When alpha is 0,
         * a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
         * a and b is returned. alpha is clamped between 0 and 1.
         */
        function lerp(a: number, b: number, alpha: number): number;
        /**
         * @function
         * @name pc.math.lerpAngle
         * @description Calculates the linear interpolation of two angles ensuring that interpolation
         * is correctly performed across the 360 to 0 degree boundary. Angles are supplied in degrees.
         * @returns {Number} The linear interpolation of two angles
         * @param {Number} a Angle (in degrees) to linearly interpolate from.
         * @param {Number} b Angle (in degrees) to linearly interpolate to.
         * @param {Number} alpha The value controlling the result of interpolation. When alpha is 0,
         * a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
         * a and b is returned. alpha is clamped between 0 and 1.
         */
        function lerpAngle(a: number, b: number, alpha: number): number;
        /**
         * @function
         * @name pc.math.powerOfTwo
         * @description Returns true if argument is a power-of-two and false otherwise.
         * @param {Number} x Number to check for power-of-two property.
         * @returns {Boolean} true if power-of-two and false otherwise.
         */
        function powerOfTwo(x: number): boolean;
        /**
         * @function
         * @name pc.math.nextPowerOfTwo
         * @description Returns the next power of 2 for the specified value.
         * @param {Number} val The value for which to calculate the next power of 2.
         * @returns {Number} The next power of 2.
         */
        function nextPowerOfTwo(val: number): number;
        /**
         * @function
         * @name pc.math.random
         * @description Return a pseudo-random number between min and max.
         * The number generated is in the range [min, max), that is inclusive of the minimum but exclusive of the maximum.
         * @param {Number} min Lower bound for range.
         * @param {Number} max Upper bound for range.
         * @returns {Number} Pseudo-random number between the supplied range.
         */
        function random(min: number, max: number): number;
        /**
         * @function
         * @name pc.math.smoothstep
         * @description The function interpolates smoothly between two input values based on
         * a third one that should be between the first two. The returned value is clamped
         * between 0 and 1.
         * <br/>The slope (i.e. derivative) of the smoothstep function starts at 0 and ends at 0.
         * This makes it easy to create a sequence of transitions using smoothstep to interpolate
         * each segment rather than using a more sophisticated or expensive interpolation technique.
         * <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
         * @param {Number} min The lower bound of the interpolation range.
         * @param {Number} max The upper bound of the interpolation range.
         * @param {Number} x The value to interpolate.
         * @returns {Number} The smoothly interpolated value clamped between zero and one.
         */
        function smoothstep(min: number, max: number, x: number): number;
        /**
         * @function
         * @name pc.math.smootherstep
         * @description An improved version of the pc.math.smoothstep function which has zero
         * 1st and 2nd order derivatives at t=0 and t=1.
         * <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
         * @param {Number} min The lower bound of the interpolation range.
         * @param {Number} max The upper bound of the interpolation range.
         * @param {Number} x The value to interpolate.
         * @returns {Number} The smoothly interpolated value clamped between zero and one.
         */
        function smootherstep(min: number, max: number, x: number): number;
    }
    /**
     * @constructor
     * @name pc.Quat
     * @classdesc A quaternion.
     * @description Create a new Quat object.
     * @param {Number} [x] The quaternion's x component. Default value 0. If x is an array of length 4, the array will be used to populate all components.
     * @param {Number} [y] The quaternion's y component. Default value 0.
     * @param {Number} [z] The quaternion's z component. Default value 0.
     * @param {Number} [w] The quaternion's w component. Default value 1.
     */
    class Quat {
        constructor(x?: number, y?: number, z?: number, w?: number);
        /**
         * @field
         * @type Number
         * @name pc.Quat#x
         * @description The x component of the quaternion.
         * @example
         * var quat = new pc.Quat();
         *
         * // Get x
         * var x = quat.x;
         *
         * // Set x
         * quat.x = 0;
         */
        x: number;
        /**
         * @field
         * @type Number
         * @name pc.Quat#y
         * @description The y component of the quaternion.
         * @example
         * var quat = new pc.Quat();
         *
         * // Get y
         * var y = quat.y;
         *
         * // Set y
         * quat.y = 0;
         */
        y: number;
        /**
         * @field
         * @type Number
         * @name pc.Quat#z
         * @description The z component of the quaternion.
         * @example
         * var quat = new pc.Quat();
         *
         * // Get z
         * var z = quat.z;
         *
         * // Set z
         * quat.z = 0;
         */
        z: number;
        /**
         * @field
         * @type Number
         * @name pc.Quat#w
         * @description The w component of the quaternion.
         * @example
         * var quat = new pc.Quat();
         *
         * // Get w
         * var w = quat.w;
         *
         * // Set w
         * quat.w = 0;
         */
        w: number;
        /**
         * @function
         * @name pc.Quat#clone
         * @description Returns an identical copy of the specified quaternion.
         * @returns {pc.Quat} A quaternion containing the result of the cloning.
         * @example
         * var q = new pc.Quat(-0.11, -0.15, -0.46, 0.87);
         * var qclone = q.clone();
         *
         * console.log("The result of the cloning is: " + q.toString());
         */
        clone(): pc.Quat;
        /**
         * @function
         * @name pc.Quat#copy
         * @description Copies the contents of a source quaternion to a destination quaternion.
         * @param {pc.Quat} rhs The quaternion to be copied.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var src = new pc.Quat();
         * var dst = new pc.Quat();
         * dst.copy(src, src);
         * console.log("The two quaternions are " + (src.equals(dst) ? "equal" : "different"));
         */
        copy(rhs: pc.Quat): pc.Quat;
        /**
         * @function
         * @name pc.Quat#equals
         * @description Reports whether two quaternions are equal.
         * @param {pc.Quat} rhs The quaternion to be compared against.
         * @returns {Boolean} true if the quaternions are equal and false otherwise.
         * @example
         * var a = new pc.Quat();
         * var b = new pc.Quat();
         * console.log("The two quaternions are " + (a.equals(b) ? "equal" : "different"));
         */
        equals(rhs: pc.Quat): boolean;
        /**
         * @function
         * @name pc.Quat#getAxisAngle
         * @description Gets the rotation axis and angle for a given
         *  quaternion. If a quaternion is created with
         *  setFromAxisAngle, this method will return the same
         *  values as provided in the original parameter list
         *  OR functionally equivalent values.
         * @param {pc.Vec3} axis The 3-dimensional vector to receive the axis of rotation.
         * @returns {Number} Angle, in degrees, of the rotation
         * @example
         * var q = new pc.Quat();
         * q.setFromAxisAngle(new pc.Vec3(0, 1, 0), 90);
         * var v = new pc.Vec3();
         * var angle = q.getAxisAngle(v);
         * // Should output 90
         * console.log(angle)
         * // Should output [0, 1, 0]
         * console.log(v.toString());
         */
        getAxisAngle(axis: pc.Vec3): number;
        /**
         * @function
         * @name pc.Quat#getEulerAngles
         * @description Converts the supplied quaternion to Euler angles.
         * @param {pc.Vec3} [eulers] The 3-dimensional vector to receive the Euler angles.
         * @returns {pc.Vec3} The 3-dimensional vector holding the Euler angles that
         * correspond to the supplied quaternion.
         */
        getEulerAngles(eulers?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Quat#invert
         * @description Generates the inverse of the specified quaternion.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * // Create a quaternion rotated 180 degrees around the y-axis
         * var rot = new pc.Quat().setFromEulerAngles(0, 180, 0);
         *
         * // Invert in place
         * rot.invert();
         */
        invert(): pc.Quat;
        /**
         * @function
         * @name pc.Quat#length
         * @description Returns the magnitude of the specified quaternion.
         * @returns {Number} The magnitude of the specified quaternion.
         * @example
         * var q = new pc.Quat(0, 0, 0, 5);
         * var len = q.length();
         * // Should output 5
         * console.log("The length of the quaternion is: " + len);
         */
        length(): number;
        /**
         * @function
         * @name pc.Quat#lengthSq
         * @description Returns the magnitude squared of the specified quaternion.
         * @returns {Number} The magnitude of the specified quaternion.
         * @example
         * var q = new pc.Quat(3, 4, 0);
         * var lenSq = q.lengthSq();
         * // Should output 25
         * console.log("The length squared of the quaternion is: " + lenSq);
         */
        lengthSq(): number;
        /**
         * @function
         * @name pc.Quat#mul
         * @description Returns the result of multiplying the specified quaternions together.
         * @param {pc.Quat} rhs The quaternion used as the second multiplicand of the operation.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var a = new pc.Quat().setFromEulerAngles(0, 30, 0);
         * var b = new pc.Quat().setFromEulerAngles(0, 60, 0);
         *
         * // a becomes a 90 degree rotation around the Y axis
         * // In other words, a = a * b
         * a.mul(b);
         *
         * console.log("The result of the multiplication is: " a.toString());
         */
        mul(rhs: pc.Quat): pc.Quat;
        /**
         * @function
         * @name pc.Quat#mul2
         * @description Returns the result of multiplying the specified quaternions together.
         * @param {pc.Quat} lhs The quaternion used as the first multiplicand of the operation.
         * @param {pc.Quat} rhs The quaternion used as the second multiplicand of the operation.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var a = new pc.Quat().setFromEulerAngles(0, 30, 0);
         * var b = new pc.Quat().setFromEulerAngles(0, 60, 0);
         * var r = new pc.Quat();
         *
         * // r is set to a 90 degree rotation around the Y axis
         * // In other words, r = a * b
         * r.mul2(a, b);
         *
         * console.log("The result of the multiplication is: " r.toString());
         */
        mul2(lhs: pc.Quat, rhs: pc.Quat): pc.Quat;
        /**
         * @function
         * @name pc.Quat#normalize
         * @description Returns the specified quaternion converted in place to a unit quaternion.
         * @returns {pc.Quat} The result of the normalization.
         * @example
         * var v = new pc.Quat(0, 0, 0, 5);
         *
         * v.normalize();
         *
         * // Should output 0, 0, 0, 1
         * console.log("The result of the vector normalization is: " + v.toString());
         */
        normalize(): pc.Quat;
        /**
         * @function
         * @name pc.Quat#set
         * @description Sets the specified quaternion to the supplied numerical values.
         * @param {Number} x The x component of the quaternion.
         * @param {Number} y The y component of the quaternion.
         * @param {Number} z The z component of the quaternion.
         * @param {Number} w The w component of the quaternion.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q = new pc.Quat();
         * q.set(1, 0, 0, 0);
         *
         * // Should output 1, 0, 0, 0
         * console.log("The result of the vector set is: " + q.toString());
         */
        set(x: number, y: number, z: number, w: number): pc.Quat;
        /**
         * @function
         * @name pc.Quat#setFromAxisAngle
         * @description Sets a quaternion from an angular rotation around an axis.
         * @param {pc.Vec3} axis World space axis around which to rotate.
         * @param {Number} angle Angle to rotate around the given axis in degrees.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q = new pc.Quat();
         * q.setFromAxisAngle(pc.Vec3.UP, 90);
         */
        setFromAxisAngle(axis: pc.Vec3, angle: number): pc.Quat;
        /**
         * @function
         * @name pc.Quat#setFromEulerAngles
         * @description Sets a quaternion from Euler angles specified in XYZ order.
         * @param {Number} ex Angle to rotate around X axis in degrees.
         * @param {Number} ey Angle to rotate around Y axis in degrees.
         * @param {Number} ez Angle to rotate around Z axis in degrees.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q = new pc.Quat();
         * q.setFromEulerAngles(45, 90, 180);
         */
        setFromEulerAngles(ex: number, ey: number, ez: number): pc.Quat;
        /**
         * @function
         * @name pc.Quat#setFromMat4
         * @description Converts the specified 4x4 matrix to a quaternion. Note that since
         * a quaternion is purely a representation for orientation, only the translational part
         * of the matrix is lost.
         * @param {pc.Mat4} m The 4x4 matrix to convert.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
         * var rot = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
         *
         * // Convert to a quaternion
         * var q = new pc.Quat().setFromMat4(rot);
         */
        setFromMat4(m: pc.Mat4): pc.Quat;
        /**
         * @function
         * @name pc.Quat#slerp
         * @description Performs a spherical interpolation between two quaternions. The result of
         * the interpolation is written to the quaternion calling the function.
         * @param {pc.Quat} lhs The quaternion to interpolate from.
         * @param {pc.Quat} rhs The quaternion to interpolate to.
         * @param {Number} alpha The value controlling the interpolation in relation to the two input
         * quaternions. The value is in the range 0 to 1, 0 generating q1, 1 generating q2 and anything
         * in between generating a spherical interpolation between the two.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q1 = new pc.Quat(-0.11,-0.15,-0.46,0.87);
         * var q2 = new pc.Quat(-0.21,-0.21,-0.67,0.68);
         *
         * var result;
         * result = new pc.Quat().slerp(q1, q2, 0);   // Return q1
         * result = new pc.Quat().slerp(q1, q2, 0.5); // Return the midpoint interpolant
         * result = new pc.Quat().slerp(q1, q2, 1);   // Return q2
         */
        slerp(lhs: pc.Quat, rhs: pc.Quat, alpha: number): pc.Quat;
        /**
         * @function
         * @name pc.Quat#transformVector
         * @description Transforms a 3-dimensional vector by the specified quaternion.
         * @param {pc.Vec3} vec The 3-dimensional vector to be transformed.
         * @param {pc.Vec3} [res] An optional 3-dimensional vector to receive the result of the transformation.
         * @returns {pc.Vec3} The input vector v transformed by the current instance.
         * @example
         * // Create a 3-dimensional vector
         * var v = new pc.Vec3(1, 2, 3);
         *
         * // Create a 4x4 rotation matrix
         * var q = new pc.Quat().setFromEulerAngles(10, 20, 30);
         *
         * var tv = q.transformVector(v);
         */
        transformVector(vec: pc.Vec3, res?: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Quat#toString
         * @description Converts the quaternion to string form.
         * @returns {String} The quaternion in string form.
         * @example
         * var v = new pc.Quat(0, 0, 0, 1);
         * // Should output '[0, 0, 0, 1]'
         * console.log(v.toString());
         */
        toString(): string;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Quat
         * @name pc.Quat.IDENTITY
         * @description A constant quaternion set to [0, 0, 0, 1] (the identity).
         */
        static readonly IDENTITY: pc.Quat;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Quat
         * @name pc.Quat.ZERO
         * @description A constant quaternion set to [0, 0, 0, 0].
         */
        static readonly ZERO: pc.Quat;
    }
    /**
     * @constructor
     * @name pc.Vec2
     * @classdesc A 2-dimensional vector.
     * @description Creates a new Vec2 object.
     * @param {Number} [x] The x value. If x is an array of length 2, the array will be used to populate all components.
     * @param {Number} [y] The y value.
     * @example
     * var v = new pc.Vec2(1, 2);
     */
    class Vec2 {
        constructor(x?: number, y?: number);
        /**
         * @function
         * @name pc.Vec2#add
         * @description Adds a 2-dimensional vector to another in place.
         * @param {pc.Vec2} rhs The vector to add to the specified vector.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var a = new pc.Vec2(10, 10);
         * var b = new pc.Vec2(20, 20);
         *
         * a.add(b);
         *
         * // Should output [30, 30]
         * console.log("The result of the addition is: " + a.toString());
         */
        add(rhs: pc.Vec2): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#add2
         * @description Adds two 2-dimensional vectors together and returns the result.
         * @param {pc.Vec2} lhs The first vector operand for the addition.
         * @param {pc.Vec2} rhs The second vector operand for the addition.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var a = new pc.Vec2(10, 10);
         * var b = new pc.Vec2(20, 20);
         * var r = new pc.Vec2();
         *
         * r.add2(a, b);
         * // Should output [30, 30]
         *
         * console.log("The result of the addition is: " + r.toString());
         */
        add2(lhs: pc.Vec2, rhs: pc.Vec2): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#clone
         * @description Returns an identical copy of the specified 2-dimensional vector.
         * @returns {pc.Vec2} A 2-dimensional vector containing the result of the cloning.
         * @example
         * var v = new pc.Vec2(10, 20);
         * var vclone = v.clone();
         * console.log("The result of the cloning is: " + vclone.toString());
         */
        clone(): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#copy
         * @description Copied the contents of a source 2-dimensional vector to a destination 2-dimensional vector.
         * @param {pc.Vec2} rhs A vector to copy to the specified vector.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var src = new pc.Vec2(10, 20);
         * var dst = new pc.Vec2();
         *
         * dst.copy(src);
         *
         * console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
         */
        copy(rhs: pc.Vec2): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#distance
         * @description Returns the distance between the two specified 2-dimensional vectors.
         * @param {pc.Vec2} rhs The second 2-dimensional vector to test.
         * @returns {Number} The distance between the two vectors.
         * @example
         * var v1 = new pc.Vec2(5, 10);
         * var v2 = new pc.Vec2(10, 20);
         * var d = v1.distance(v2);
         * console.log("The between v1 and v2 is: " + d);
         */
        distance(rhs: pc.Vec2): number;
        /**
         * @function
         * @name pc.Vec2#dot
         * @description Returns the result of a dot product operation performed on the two specified 2-dimensional vectors.
         * @param {pc.Vec2} rhs The second 2-dimensional vector operand of the dot product.
         * @returns {Number} The result of the dot product operation.
         * @example
         * var v1 = new pc.Vec2(5, 10);
         * var v2 = new pc.Vec2(10, 20);
         * var v1dotv2 = v1.dot(v2);
         * console.log("The result of the dot product is: " + v1dotv2);
         */
        dot(rhs: pc.Vec2): number;
        /**
         * @function
         * @name pc.Vec2#equals
         * @description Reports whether two vectors are equal.
         * @param {pc.Vec2} rhs The vector to compare to the specified vector.
         * @returns {Boolean} true if the vectors are equal and false otherwise.
         * @example
         * var a = new pc.Vec2(1, 2);
         * var b = new pc.Vec2(4, 5);
         * console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
         */
        equals(rhs: pc.Vec2): boolean;
        /**
         * @function
         * @name pc.Vec2#length
         * @description Returns the magnitude of the specified 2-dimensional vector.
         * @returns {Number} The magnitude of the specified 2-dimensional vector.
         * @example
         * var vec = new pc.Vec2(3, 4);
         * var len = vec.length();
         * // Should output 5
         * console.log("The length of the vector is: " + len);
         */
        length(): number;
        /**
         * @function
         * @name pc.Vec2#lengthSq
         * @description Returns the magnitude squared of the specified 2-dimensional vector.
         * @returns {Number} The magnitude of the specified 2-dimensional vector.
         * @example
         * var vec = new pc.Vec2(3, 4);
         * var len = vec.lengthSq();
         * // Should output 25
         * console.log("The length squared of the vector is: " + len);
         */
        lengthSq(): number;
        /**
         * @function
         * @name pc.Vec2#lerp
         * @description Returns the result of a linear interpolation between two specified 2-dimensional vectors.
         * @param {pc.Vec2} lhs The 2-dimensional to interpolate from.
         * @param {pc.Vec2} rhs The 2-dimensional to interpolate to.
         * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
         * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
         * a ray extrapolated from this line.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var a = new pc.Vec2(0, 0);
         * var b = new pc.Vec2(10, 10);
         * var r = new pc.Vec2();
         *
         * r.lerp(a, b, 0);   // r is equal to a
         * r.lerp(a, b, 0.5); // r is 5, 5
         * r.lerp(a, b, 1);   // r is equal to b
         */
        lerp(lhs: pc.Vec2, rhs: pc.Vec2, alpha: number): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#mul
         * @description Multiplies a 2-dimensional vector to another in place.
         * @param {pc.Vec2} rhs The 2-dimensional vector used as the second multiplicand of the operation.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var a = new pc.Vec2(2, 3);
         * var b = new pc.Vec2(4, 5);
         *
         * a.mul(b);
         *
         * // Should output 8, 15
         * console.log("The result of the multiplication is: " + a.toString());
         */
        mul(rhs: pc.Vec2): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#mul2
         * @description Returns the result of multiplying the specified 2-dimensional vectors together.
         * @param {pc.Vec2} lhs The 2-dimensional vector used as the first multiplicand of the operation.
         * @param {pc.Vec2} rhs The 2-dimensional vector used as the second multiplicand of the operation.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var a = new pc.Vec2(2, 3);
         * var b = new pc.Vec2(4, 5);
         * var r = new pc.Vec2();
         *
         * r.mul2(a, b);
         *
         * // Should output 8, 15
         * console.log("The result of the multiplication is: " + r.toString());
         */
        mul2(lhs: pc.Vec2, rhs: pc.Vec2): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#normalize
         * @description Returns the specified 2-dimensional vector copied and converted to a unit vector.
         * If the vector has a length of zero, the vector's elements will be set to zero.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var v = new pc.Vec2(25, 0);
         *
         * v.normalize();
         *
         * // Should output 1, 0
         * console.log("The result of the vector normalization is: " + v.toString());
         */
        normalize(): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#scale
         * @description Scales each component of the specified 2-dimensional vector by the supplied
         * scalar value.
         * @param {Number} scalar The value by which each vector component is multiplied.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var v = new pc.Vec2(2, 4);
         *
         * // Multiply by 2
         * v.scale(2);
         *
         * // Negate
         * v.scale(-1);
         *
         * // Divide by 2
         * v.scale(0.5);
         */
        scale(scalar: number): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#set
         * @description Sets the specified 2-dimensional vector to the supplied numerical values.
         * @param {Number} x The value to set on the first component of the vector.
         * @param {Number} y The value to set on the second component of the vector.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var v = new pc.Vec2();
         * v.set(5, 10);
         *
         * // Should output 5, 10
         * console.log("The result of the vector set is: " + v.toString());
         */
        set(x: number, y: number): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#sub
         * @description Subtracts a 2-dimensional vector from another in place.
         * @param {pc.Vec2} rhs The vector to add to the specified vector.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var a = new pc.Vec2(10, 10);
         * var b = new pc.Vec2(20, 20);
         *
         * a.sub(b);
         *
         * // Should output [-10, -10]
         * console.log("The result of the addition is: " + a.toString());
         */
        sub(rhs: pc.Vec2): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#sub2
         * @description Subtracts two 2-dimensional vectors from one another and returns the result.
         * @param {pc.Vec2} lhs The first vector operand for the addition.
         * @param {pc.Vec2} rhs The second vector operand for the addition.
         * @returns {pc.Vec2} Self for chaining.
         * @example
         * var a = new pc.Vec2(10, 10);
         * var b = new pc.Vec2(20, 20);
         * var r = new pc.Vec2();
         *
         * r.sub2(a, b);
         *
         * // Should output [-10, -10]
         * console.log("The result of the addition is: " + r.toString());
         */
        sub2(lhs: pc.Vec2, rhs: pc.Vec2): pc.Vec2;
        /**
         * @function
         * @name pc.Vec2#toString
         * @description Converts the vector to string form.
         * @returns {String} The vector in string form.
         * @example
         * var v = new pc.Vec2(20, 10);
         * // Should output '[20, 10]'
         * console.log(v.toString());
         */
        toString(): string;
        /**
         * @field
         * @type Number
         * @name pc.Vec2#x
         * @description The first element of the vector.
         * @example
         * var vec = new pc.Vec2(10, 20);
         *
         * // Get x
         * var x = vec.x;
         *
         * // Set x
         * vec.x = 0;
         */
        x: number;
        /**
         * @field
         * @type Number
         * @name pc.Vec2#y
         * @description The second element of the vector.
         * @example
         * var vec = new pc.Vec2(10, 20);
         *
         * // Get y
         * var y = vec.y;
         *
         * // Set y
         * vec.y = 0;
         */
        y: number;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec2
         * @name pc.Vec2.ONE
         * @description A constant vector set to [1, 1].
         */
        static readonly ONE: pc.Vec2;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec2
         * @name pc.Vec2.RIGHT
         * @description A constant vector set to [1, 0].
         */
        static readonly RIGHT: pc.Vec2;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec2
         * @name pc.Vec2.UP
         * @description A constant vector set to [0, 1].
         */
        static readonly UP: pc.Vec2;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec2
         * @name pc.Vec2.ZERO
         * @description A constant vector set to [0, 0].
         */
        static readonly ZERO: pc.Vec2;
    }
    /**
     * @constructor
     * @name pc.Vec3
     * @classdesc A 3-dimensional vector.
     * @description Creates a new Vec3 object.
     * @param {Number} [x] The x value. If x is an array of length 3, the array will be used to populate all components.
     * @param {Number} [y] The y value.
     * @param {Number} [z] The z value.
     * @example
     * var v = new pc.Vec3(1, 2, 3);
     */
    class Vec3 {
        constructor(x?: number, y?: number, z?: number);
        /**
         * @function
         * @name pc.Vec3#add
         * @description Adds a 3-dimensional vector to another in place.
         * @param {pc.Vec3} rhs The vector to add to the specified vector.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(10, 10, 10);
         * var b = new pc.Vec3(20, 20, 20);
         *
         * a.add(b);
         *
         * // Should output [30, 30, 30]
         * console.log("The result of the addition is: " + a.toString());
         */
        add(rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#add2
         * @description Adds two 3-dimensional vectors together and returns the result.
         * @param {pc.Vec3} lhs The first vector operand for the addition.
         * @param {pc.Vec3} rhs The second vector operand for the addition.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(10, 10, 10);
         * var b = new pc.Vec3(20, 20, 20);
         * var r = new pc.Vec3();
         *
         * r.add2(a, b);
         * // Should output [30, 30, 30]
         *
         * console.log("The result of the addition is: " + r.toString());
         */
        add2(lhs: pc.Vec3, rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#clone
         * @description Returns an identical copy of the specified 3-dimensional vector.
         * @returns {pc.Vec3} A 3-dimensional vector containing the result of the cloning.
         * @example
         * var v = new pc.Vec3(10, 20, 30);
         * var vclone = v.clone();
         * console.log("The result of the cloning is: " + vclone.toString());
         */
        clone(): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#copy
         * @description Copied the contents of a source 3-dimensional vector to a destination 3-dimensional vector.
         * @param {pc.Vec3} rhs A vector to copy to the specified vector.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var src = new pc.Vec3(10, 20, 30);
         * var dst = new pc.Vec3();
         *
         * dst.copy(src);
         *
         * console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
         */
        copy(rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#cross
         * @description Returns the result of a cross product operation performed on the two specified 3-dimensional vectors.
         * @param {pc.Vec3} lhs The first 3-dimensional vector operand of the cross product.
         * @param {pc.Vec3} rhs The second 3-dimensional vector operand of the cross product.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var back = new pc.Vec3().cross(pc.Vec3.RIGHT, pc.Vec3.UP);
         *
         * // Should print the Z axis (i.e. [0, 0, 1])
         * console.log("The result of the cross product is: " + back.toString());
         */
        cross(lhs: pc.Vec3, rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#distance
         * @description Returns the distance between the two specified 3-dimensional vectors.
         * @param {pc.Vec3} rhs The second 3-dimensional vector to test.
         * @returns {Number} The distance between the two vectors.
         * @example
         * var v1 = new pc.Vec3(5, 10, 20);
         * var v2 = new pc.Vec3(10, 20, 40);
         * var d = v1.distance(v2);
         * console.log("The between v1 and v2 is: " + d);
         */
        distance(rhs: pc.Vec3): number;
        /**
         * @function
         * @name pc.Vec3#dot
         * @description Returns the result of a dot product operation performed on the two specified 3-dimensional vectors.
         * @param {pc.Vec3} rhs The second 3-dimensional vector operand of the dot product.
         * @returns {Number} The result of the dot product operation.
         * @example
         * var v1 = new pc.Vec3(5, 10, 20);
         * var v2 = new pc.Vec3(10, 20, 40);
         * var v1dotv2 = v1.dot(v2);
         * console.log("The result of the dot product is: " + v1dotv2);
         */
        dot(rhs: pc.Vec3): number;
        /**
         * @function
         * @name pc.Vec3#equals
         * @description Reports whether two vectors are equal.
         * @param {pc.Vec3} rhs The vector to compare to the specified vector.
         * @returns {Boolean} true if the vectors are equal and false otherwise.
         * @example
         * var a = new pc.Vec3(1, 2, 3);
         * var b = new pc.Vec3(4, 5, 6);
         * console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
         */
        equals(rhs: pc.Vec3): boolean;
        /**
         * @function
         * @name pc.Vec3#length
         * @description Returns the magnitude of the specified 3-dimensional vector.
         * @returns {Number} The magnitude of the specified 3-dimensional vector.
         * @example
         * var vec = new pc.Vec3(3, 4, 0);
         * var len = vec.length();
         * // Should output 5
         * console.log("The length of the vector is: " + len);
         */
        length(): number;
        /**
         * @function
         * @name pc.Vec3#lengthSq
         * @description Returns the magnitude squared of the specified 3-dimensional vector.
         * @returns {Number} The magnitude of the specified 3-dimensional vector.
         * @example
         * var vec = new pc.Vec3(3, 4, 0);
         * var len = vec.lengthSq();
         * // Should output 25
         * console.log("The length squared of the vector is: " + len);
         */
        lengthSq(): number;
        /**
         * @function
         * @name pc.Vec3#lerp
         * @description Returns the result of a linear interpolation between two specified 3-dimensional vectors.
         * @param {pc.Vec3} lhs The 3-dimensional to interpolate from.
         * @param {pc.Vec3} rhs The 3-dimensional to interpolate to.
         * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
         * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
         * a ray extrapolated from this line.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(0, 0, 0);
         * var b = new pc.Vec3(10, 10, 10);
         * var r = new pc.Vec3();
         *
         * r.lerp(a, b, 0);   // r is equal to a
         * r.lerp(a, b, 0.5); // r is 5, 5, 5
         * r.lerp(a, b, 1);   // r is equal to b
         */
        lerp(lhs: pc.Vec3, rhs: pc.Vec3, alpha: number): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#mul
         * @description Multiplies a 3-dimensional vector to another in place.
         * @param {pc.Vec3} rhs The 3-dimensional vector used as the second multiplicand of the operation.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(2, 3, 4);
         * var b = new pc.Vec3(4, 5, 6);
         *
         * a.mul(b);
         *
         * // Should output 8, 15, 24
         * console.log("The result of the multiplication is: " + a.toString());
         */
        mul(rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#mul2
         * @description Returns the result of multiplying the specified 3-dimensional vectors together.
         * @param {pc.Vec3} lhs The 3-dimensional vector used as the first multiplicand of the operation.
         * @param {pc.Vec3} rhs The 3-dimensional vector used as the second multiplicand of the operation.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(2, 3, 4);
         * var b = new pc.Vec3(4, 5, 6);
         * var r = new pc.Vec3();
         *
         * r.mul2(a, b);
         *
         * // Should output 8, 15, 24
         * console.log("The result of the multiplication is: " + r.toString());
         */
        mul2(lhs: pc.Vec3, rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#normalize
         * @description Returns the specified 3-dimensional vector copied and converted to a unit vector.
         * If the vector has a length of zero, the vector's elements will be set to zero.
         * @returns {pc.Vec3} The result of the normalization.
         * @example
         * var v = new pc.Vec3(25, 0, 0);
         *
         * v.normalize();
         *
         * // Should output 1, 0, 0, 0
         * console.log("The result of the vector normalization is: " + v.toString());
         */
        normalize(): pc.Vec3;
        /**
         * @function
         * @name  pc.Vec3#project
         * @description Projects this 3-dimensional vector onto the specified vector.
         * @param {pc.Vec3} rhs The vector onto which the original vector will be projected on.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var v = new pc.Vec3(5, 5, 5);
         * var normal = new pc.Vec3(1, 0, 0);
         *
         * v.project(normal);
         *
         * // Should output 5, 0, 0
         * console.log("The result of the vector projection is: " + v.toString());
         */
        project(rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#scale
         * @description Scales each dimension of the specified 3-dimensional vector by the supplied
         * scalar value.
         * @param {Number} scalar The value by which each vector component is multiplied.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var v = new pc.Vec3(2, 4, 8);
         *
         * // Multiply by 2
         * v.scale(2);
         *
         * // Negate
         * v.scale(-1);
         *
         * // Divide by 2
         * v.scale(0.5);
         */
        scale(scalar: number): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#set
         * @description Sets the specified 3-dimensional vector to the supplied numerical values.
         * @param {Number} x The value to set on the first component of the vector.
         * @param {Number} y The value to set on the second component of the vector.
         * @param {Number} z The value to set on the third component of the vector.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var v = new pc.Vec3();
         * v.set(5, 10, 20);
         *
         * // Should output 5, 10, 20
         * console.log("The result of the vector set is: " + v.toString());
         */
        set(x: number, y: number, z: number): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#sub
         * @description Subtracts a 3-dimensional vector from another in place.
         * @param {pc.Vec3} rhs The vector to add to the specified vector.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(10, 10, 10);
         * var b = new pc.Vec3(20, 20, 20);
         *
         * a.sub(b);
         *
         * // Should output [-10, -10, -10]
         * console.log("The result of the addition is: " + a.toString());
         */
        sub(rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#sub2
         * @description Subtracts two 3-dimensional vectors from one another and returns the result.
         * @param {pc.Vec3} lhs The first vector operand for the addition.
         * @param {pc.Vec3} rhs The second vector operand for the addition.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(10, 10, 10);
         * var b = new pc.Vec3(20, 20, 20);
         * var r = new pc.Vec3();
         *
         * r.sub2(a, b);
         *
         * // Should output [-10, -10, -10]
         * console.log("The result of the addition is: " + r.toString());
         */
        sub2(lhs: pc.Vec3, rhs: pc.Vec3): pc.Vec3;
        /**
         * @function
         * @name pc.Vec3#toString
         * @description Converts the vector to string form.
         * @returns {String} The vector in string form.
         * @example
         * var v = new pc.Vec3(20, 10, 5);
         * // Should output '[20, 10, 5]'
         * console.log(v.toString());
         */
        toString(): string;
        /**
         * @name pc.Vec3#x
         * @type Number
         * @description The first component of the vector.
         * @example
         * var vec = new pc.Vec3(10, 20, 30);
         *
         * // Get x
         * var x = vec.x;
         *
         * // Set x
         * vec.x = 0;
         */
        x: number;
        /**
         * @name pc.Vec3#y
         * @type Number
         * @description The second component of the vector.
         * @example
         * var vec = new pc.Vec3(10, 20, 30);
         *
         * // Get y
         * var y = vec.y;
         *
         * // Set y
         * vec.y = 0;
         */
        y: number;
        /**
         * @name pc.Vec3#z
         * @type Number
         * @description The third component of the vector.
         * @example
         * var vec = new pc.Vec3(10, 20, 30);
         *
         * // Get z
         * var z = vec.z;
         *
         * // Set z
         * vec.z = 0;
         */
        z: number;
        /**
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.BACK
         * @description A constant vector set to [0, 0, 1].
         */
        static readonly BACK: pc.Vec3;
        /**
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.DOWN
         * @description A constant vector set to [0, -1, 0].
         */
        static readonly DOWN: pc.Vec3;
        /**
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.FORWARD
         * @description A constant vector set to [0, 0, -1].
         */
        static readonly FORWARD: pc.Vec3;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.LEFT
         * @description A constant vector set to [-1, 0, 0].
         */
        static readonly LEFT: pc.Vec3;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.ONE
         * @description A constant vector set to [1, 1, 1].
         */
        static readonly ONE: pc.Vec3;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.RIGHT
         * @description A constant vector set to [1, 0, 0].
         */
        static readonly RIGHT: pc.Vec3;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.UP
         * @description A constant vector set to [0, 1, 0].
         */
        static readonly UP: pc.Vec3;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec3
         * @name pc.Vec3.ZERO
         * @description A constant vector set to [0, 0, 0].
         */
        static readonly ZERO: pc.Vec3;
    }
    /**
     * @constructor
     * @name pc.Vec4
     * @classdesc A 4-dimensional vector.
     * @description Creates a new Vec4 object.
     * @param {Number} [x] The x value. If x is an array of length 4, the array will be used to populate all components.
     * @param {Number} [y] The y value.
     * @param {Number} [z] The z value.
     * @param {Number} [w] The w value.
     * @example
     * var v = new pc.Vec4(1, 2, 3, 4);
     */
    class Vec4 {
        constructor(x?: number, y?: number, z?: number, w?: number);
        /**
         * @function
         * @name pc.Vec4#add
         * @description Adds a 4-dimensional vector to another in place.
         * @param {pc.Vec4} rhs The vector to add to the specified vector.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var a = new pc.Vec4(10, 10, 10, 10);
         * var b = new pc.Vec4(20, 20, 20, 20);
         *
         * a.add(b);
         *
         * // Should output [30, 30, 30]
         * console.log("The result of the addition is: " + a.toString());
         */
        add(rhs: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#add2
         * @description Adds two 4-dimensional vectors together and returns the result.
         * @param {pc.Vec4} lhs The first vector operand for the addition.
         * @param {pc.Vec4} rhs The second vector operand for the addition.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var a = new pc.Vec4(10, 10, 10, 10);
         * var b = new pc.Vec4(20, 20, 20, 20);
         * var r = new pc.Vec4();
         *
         * r.add2(a, b);
         * // Should output [30, 30, 30]
         *
         * console.log("The result of the addition is: " + r.toString());
         */
        add2(lhs: pc.Vec4, rhs: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#clone
         * @description Returns an identical copy of the specified 4-dimensional vector.
         * @returns {pc.Vec4} A 4-dimensional vector containing the result of the cloning.
         * @example
         * var v = new pc.Vec4(10, 20, 30, 40);
         * var vclone = v.clone();
         * console.log("The result of the cloning is: " + vclone.toString());
         */
        clone(): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#copy
         * @description Copied the contents of a source 4-dimensional vector to a destination 4-dimensional vector.
         * @param {pc.Vec4} rhs A vector to copy to the specified vector.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var src = new pc.Vec4(10, 20, 30, 40);
         * var dst = new pc.Vec4();
         *
         * dst.copy(src);
         *
         * console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
         */
        copy(rhs: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#dot
         * @description Returns the result of a dot product operation performed on the two specified 4-dimensional vectors.
         * @param {pc.Vec4} rhs The second 4-dimensional vector operand of the dot product.
         * @returns {Number} The result of the dot product operation.
         * @example
         * var v1 = new pc.Vec4(5, 10, 20, 40);
         * var v2 = new pc.Vec4(10, 20, 40, 80);
         * var v1dotv2 = v1.dot(v2);
         * console.log("The result of the dot product is: " + v1dotv2);
         */
        dot(rhs: pc.Vec4): number;
        /**
         * @function
         * @name pc.Vec4#equals
         * @description Reports whether two vectors are equal.
         * @param {pc.Vec4} rhs The vector to compare to the specified vector.
         * @returns {Boolean} true if the vectors are equal and false otherwise.
         * @example
         * var a = new pc.Vec4(1, 2, 3, 4);
         * var b = new pc.Vec4(5, 6, 7, 8);
         * console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
         */
        equals(rhs: pc.Vec4): boolean;
        /**
         * @function
         * @name pc.Vec4#length
         * @description Returns the magnitude of the specified 4-dimensional vector.
         * @returns {Number} The magnitude of the specified 4-dimensional vector.
         * @example
         * var vec = new pc.Vec4(3, 4, 0, 0);
         * var len = vec.length();
         * // Should output 5
         * console.log("The length of the vector is: " + len);
         */
        length(): number;
        /**
         * @function
         * @name pc.Vec4#lengthSq
         * @description Returns the magnitude squared of the specified 4-dimensional vector.
         * @returns {Number} The magnitude of the specified 4-dimensional vector.
         * @example
         * var vec = new pc.Vec4(3, 4, 0);
         * var len = vec.lengthSq();
         * // Should output 25
         * console.log("The length squared of the vector is: " + len);
         */
        lengthSq(): number;
        /**
         * @function
         * @name pc.Vec4#lerp
         * @description Returns the result of a linear interpolation between two specified 4-dimensional vectors.
         * @param {pc.Vec4} lhs The 4-dimensional to interpolate from.
         * @param {pc.Vec4} rhs The 4-dimensional to interpolate to.
         * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
         * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
         * a ray extrapolated from this line.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var a = new pc.Vec4(0, 0, 0, 0);
         * var b = new pc.Vec4(10, 10, 10, 10);
         * var r = new pc.Vec4();
         *
         * r.lerp(a, b, 0);   // r is equal to a
         * r.lerp(a, b, 0.5); // r is 5, 5, 5, 5
         * r.lerp(a, b, 1);   // r is equal to b
         */
        lerp(lhs: pc.Vec4, rhs: pc.Vec4, alpha: number): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#mul
         * @description Multiplies a 4-dimensional vector to another in place.
         * @param {pc.Vec4} rhs The 4-dimensional vector used as the second multiplicand of the operation.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var a = new pc.Vec4(2, 3, 4, 5);
         * var b = new pc.Vec4(4, 5, 6, 7);
         *
         * a.mul(b);
         *
         * // Should output 8, 15, 24, 35
         * console.log("The result of the multiplication is: " + a.toString());
         */
        mul(rhs: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#mul2
         * @description Returns the result of multiplying the specified 4-dimensional vectors together.
         * @param {pc.Vec4} lhs The 4-dimensional vector used as the first multiplicand of the operation.
         * @param {pc.Vec4} rhs The 4-dimensional vector used as the second multiplicand of the operation.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var a = new pc.Vec4(2, 3, 4, 5);
         * var b = new pc.Vec4(4, 5, 6, 7);
         * var r = new pc.Vec4();
         *
         * r.mul2(a, b);
         *
         * // Should output 8, 15, 24, 35
         * console.log("The result of the multiplication is: " + r.toString());
         */
        mul2(lhs: pc.Vec4, rhs: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#normalize
         * @description Returns the specified 4-dimensional vector copied and converted to a unit vector.
         * If the vector has a length of zero, the vector's elements will be set to zero.
         * @returns {pc.Vec4} The result of the normalization.
         * @example
         * var v = new pc.Vec4(25, 0, 0, 0);
         *
         * v.normalize();
         *
         * // Should output 1, 0, 0, 0
         * console.log("The result of the vector normalization is: " + v.toString());
         */
        normalize(): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#scale
         * @description Scales each dimension of the specified 4-dimensional vector by the supplied
         * scalar value.
         * @param {Number} scalar The value by which each vector component is multiplied.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var v = new pc.Vec4(2, 4, 8, 16);
         *
         * // Multiply by 2
         * v.scale(2);
         *
         * // Negate
         * v.scale(-1);
         *
         * // Divide by 2
         * v.scale(0.5);
         */
        scale(scalar: number): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#set
         * @description Sets the specified 4-dimensional vector to the supplied numerical values.
         * @param {Number} x The value to set on the first component of the vector.
         * @param {Number} y The value to set on the second component of the vector.
         * @param {Number} z The value to set on the third component of the vector.
         * @param {Number} w The value to set on the fourth component of the vector.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var v = new pc.Vec4();
         * v.set(5, 10, 20, 40);
         *
         * // Should output 5, 10, 20, 40
         * console.log("The result of the vector set is: " + v.toString());
         */
        set(x: number, y: number, z: number, w: number): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#sub
         * @description Subtracts a 4-dimensional vector from another in place.
         * @param {pc.Vec4} rhs The vector to add to the specified vector.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var a = new pc.Vec4(10, 10, 10, 10);
         * var b = new pc.Vec4(20, 20, 20, 20);
         *
         * a.sub(b);
         *
         * // Should output [-10, -10, -10, -10]
         * console.log("The result of the subtraction is: " + a.toString());
         */
        sub(rhs: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#sub2
         * @description Subtracts two 4-dimensional vectors from one another and returns the result.
         * @param {pc.Vec4} lhs The first vector operand for the subtraction.
         * @param {pc.Vec4} rhs The second vector operand for the subtraction.
         * @returns {pc.Vec4} Self for chaining.
         * @example
         * var a = new pc.Vec4(10, 10, 10, 10);
         * var b = new pc.Vec4(20, 20, 20, 20);
         * var r = new pc.Vec4();
         *
         * r.sub2(a, b);
         *
         * // Should output [-10, -10, -10, -10]
         * console.log("The result of the subtraction is: " + r.toString());
         */
        sub2(lhs: pc.Vec4, rhs: pc.Vec4): pc.Vec4;
        /**
         * @function
         * @name pc.Vec4#toString
         * @description Converts the vector to string form.
         * @returns {String} The vector in string form.
         * @example
         * var v = new pc.Vec4(20, 10, 5, 0);
         * // Should output '[20, 10, 5, 0]'
         * console.log(v.toString());
         */
        toString(): string;
        /**
         * @field
         * @type Number
         * @name pc.Vec4#x
         * @description The first component of the vector.
         * @example
         * var vec = new pc.Vec4(10, 20, 30, 40);
         *
         * // Get x
         * var x = vec.x;
         *
         * // Set x
         * vec.x = 0;
         */
        x: number;
        /**
         * @field
         * @type Number
         * @name pc.Vec4#y
         * @description The second component of the vector.
         * @example
         * var vec = new pc.Vec4(10, 20, 30, 40);
         *
         * // Get y
         * var y = vec.y;
         *
         * // Set y
         * vec.y = 0;
         */
        y: number;
        /**
         * @field
         * @type Number
         * @name pc.Vec4#z
         * @description The third component of the vector.
         * @example
         * var vec = new pc.Vec4(10, 20, 30, 40);
         *
         * // Get z
         * var z = vec.z;
         *
         * // Set z
         * vec.z = 0;
         */
        z: number;
        /**
         * @field
         * @type Number
         * @name pc.Vec4#w
         * @description The fourth component of the vector.
         * @example
         * var vec = new pc.Vec4(10, 20, 30, 40);
         *
         * // Get w
         * var w = vec.w;
         *
         * // Set w
         * vec.w = 0;
         */
        w: number;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec4
         * @name pc.Vec4.ONE
         * @description A constant vector set to [1, 1, 1, 1].
         */
        static readonly ONE: pc.Vec4;
        /**
         * @field
         * @static
         * @readonly
         * @type pc.Vec4
         * @name pc.Vec4.ZERO
         * @description A constant vector set to [0, 0, 0, 0].
         */
        static readonly ZERO: pc.Vec4;
    }
    /**
     * @constructor
     * @name pc.Http
     * @classdesc Used to send and receive HTTP requests.
     * @description Create a new Http instance. By default, a PlayCanvas application creates an instance of this
     * object at `pc.http`.
     */
    class Http {
        /**
         * @function
         * @name pc.Http#get
         * @variation 1
         * @description Perform an HTTP GET request to the given url.
         * @param {String} url The URL to make the request to.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @example
         * pc.http.get("http://example.com/", function (err, response) {
         *     console.log(response);
         * });
         * @returns {XMLHttpRequest} The request object.
         */
        get(url: string, callback: (...params: any[]) => any): XMLHttpRequest;
        /** @function
         * @name pc.Http#get
         * @variation 2
         * @description Perform an HTTP GET request to the given url.
         * @param {String} url The URL to make the request to.
         * @param {Object} options Additional options
         * @param {Object} [options.headers] HTTP headers to add to the request
         * @param {Boolean} [options.async] Make the request asynchronously. Defaults to true.
         * @param {Object} [options.cache] If false, then add a timestamp to the request to prevent caching
         * @param {Boolean} [options.withCredentials] Send cookies with this request. Defaults to true.
         * @param {String} [options.responseType] Override the response type
         * @param {Document | Object} [options.postdata] Data to send in the body of the request.
         * Some content types are handled automatically. If postdata is an XML Document, it is handled. If
         * the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
         * Otherwise, by default, the data is sent as form-urlencoded.
         * @param {Boolean} [options.retry] If true then if the request fails it will be retried with an exponential backoff.
         * @param {Number} [options.maxRetries] If options.retry is true this specifies the maximum number of retries. Defaults to 5.
         * @param {Number} [options.maxRetryDelay] If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        get(url: string, options: {
            headers?: any;
            async?: boolean;
            cache?: any;
            withCredentials?: boolean;
            responseType?: string;
            postdata?: Document | any;
            retry?: boolean;
            maxRetries?: number;
            maxRetryDelay?: number;
        }, callback: (...params: any[]) => any): XMLHttpRequest;
        /**
         * @function
         * @name pc.Http#post
         * @variation 1
         * @description Perform an HTTP POST request to the given url.
         * @param {String} url The URL to make the request to.
         * @param {Object} data Data to send in the body of the request.
         * Some content types are handled automatically. If postdata is an XML Document, it is handled. If
         * the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
         * Otherwise, by default, the data is sent as form-urlencoded.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        post(url: string, data: any, callback: (...params: any[]) => any): XMLHttpRequest;
        /** @function
         * @name pc.Http#post
         * @variation 2
         * @description Perform an HTTP POST request to the given url.
         * @param {String} url The URL to make the request to.
         * @param {Object} data Data to send in the body of the request.
         * Some content types are handled automatically. If postdata is an XML Document, it is handled. If
         * the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
         * Otherwise, by default, the data is sent as form-urlencoded.
         * @param {Object} options Additional options
         * @param {Object} [options.headers] HTTP headers to add to the request
         * @param {Boolean} [options.async] Make the request asynchronously. Defaults to true.
         * @param {Object} [options.cache] If false, then add a timestamp to the request to prevent caching
         * @param {Boolean} [options.withCredentials] Send cookies with this request. Defaults to true.
         * @param {String} [options.responseType] Override the response type
         * @param {Boolean} [options.retry] If true then if the request fails it will be retried with an exponential backoff.
         * @param {Number} [options.maxRetries] If options.retry is true this specifies the maximum number of retries. Defaults to 5.
         * @param {Number} [options.maxRetryDelay] If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        post(url: string, data: any, options: {
            headers?: any;
            async?: boolean;
            cache?: any;
            withCredentials?: boolean;
            responseType?: string;
            retry?: boolean;
            maxRetries?: number;
            maxRetryDelay?: number;
        }, callback: (...params: any[]) => any): XMLHttpRequest;
        /**
         * @function
         * @name pc.Http#put
         * @variation 1
         * @description Perform an HTTP PUT request to the given url.
         * @param {String} url The URL to make the request to.
         * @param {Document | Object} data Data to send in the body of the request.
         * Some content types are handled automatically. If postdata is an XML Document, it is handled. If
         * the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
         * Otherwise, by default, the data is sent as form-urlencoded.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        put(url: string, data: Document | any, callback: (...params: any[]) => any): XMLHttpRequest;
        /** @function
         * @name pc.Http#put
         * @variation 2
         * @description Perform an HTTP PUT request to the given url.
         * @param {String} url The URL to make the request to.
         * @param {Document | Object} data Data to send in the body of the request.
         * Some content types are handled automatically. If postdata is an XML Document, it is handled. If
         * the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
         * Otherwise, by default, the data is sent as form-urlencoded.
         * @param {Object} options Additional options
         * @param {Object} [options.headers] HTTP headers to add to the request
         * @param {Boolean} [options.async] Make the request asynchronously. Defaults to true.
         * @param {Object} [options.cache] If false, then add a timestamp to the request to prevent caching
         * @param {Boolean} [options.withCredentials] Send cookies with this request. Defaults to true.
         * @param {String} [options.responseType] Override the response type
         * @param {Boolean} [options.retry] If true then if the request fails it will be retried with an exponential backoff.
         * @param {Number} [options.maxRetries] If options.retry is true this specifies the maximum number of retries. Defaults to 5.
         * @param {Number} [options.maxRetryDelay] If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        put(url: string, data: Document | any, options: {
            headers?: any;
            async?: boolean;
            cache?: any;
            withCredentials?: boolean;
            responseType?: string;
            retry?: boolean;
            maxRetries?: number;
            maxRetryDelay?: number;
        }, callback: (...params: any[]) => any): XMLHttpRequest;
        /**
         * @function
         * @name pc.Http#del
         * @variation 1
         * @description Perform an HTTP DELETE request to the given url
         * @param {Object} url The URL to make the request to
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        del(url: any, callback: (...params: any[]) => any): XMLHttpRequest;
        /** @function
         * @name pc.Http#del
         * @variation 2
         * @description Perform an HTTP DELETE request to the given url
         * @param {Object} url The URL to make the request to
         * @param {Object} options Additional options
         * @param {Object} [options.headers] HTTP headers to add to the request
         * @param {Boolean} [options.async] Make the request asynchronously. Defaults to true.
         * @param {Object} [options.cache] If false, then add a timestamp to the request to prevent caching
         * @param {Boolean} [options.withCredentials] Send cookies with this request. Defaults to true.
         * @param {String} [options.responseType] Override the response type
         * @param {Document | Object} [options.postdata] Data to send in the body of the request.
         * Some content types are handled automatically. If postdata is an XML Document, it is handled. If
         * the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
         * Otherwise, by default, the data is sent as form-urlencoded.
         * @param {Boolean} [options.retry] If true then if the request fails it will be retried with an exponential backoff.
         * @param {Number} [options.maxRetries] If options.retry is true this specifies the maximum number of retries. Defaults to 5.
         * @param {Number} [options.maxRetryDelay] If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        del(url: any, options: {
            headers?: any;
            async?: boolean;
            cache?: any;
            withCredentials?: boolean;
            responseType?: string;
            postdata?: Document | any;
            retry?: boolean;
            maxRetries?: number;
            maxRetryDelay?: number;
        }, callback: (...params: any[]) => any): XMLHttpRequest;
        /**
         * @function
         * @name pc.Http#request
         * @variation 1
         * @description Make a general purpose HTTP request.
         * @param {String} method The HTTP method "GET", "POST", "PUT", "DELETE"
         * @param {String} url The url to make the request to
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        request(method: string, url: string, callback: (...params: any[]) => any): XMLHttpRequest;
        /** @function
         * @name pc.Http#request
         * @variation 2
         * @description Make a general purpose HTTP request.
         * @param {String} method The HTTP method "GET", "POST", "PUT", "DELETE"
         * @param {String} url The url to make the request to
         * @param {Object} options Additional options
         * @param {Object} [options.headers] HTTP headers to add to the request
         * @param {Boolean} [options.async] Make the request asynchronously. Defaults to true.
         * @param {Object} [options.cache] If false, then add a timestamp to the request to prevent caching
         * @param {Boolean} [options.withCredentials] Send cookies with this request. Defaults to true.
         * @param {Boolean} [options.retry] If true then if the request fails it will be retried with an exponential backoff.
         * @param {Number} [options.maxRetries] If options.retry is true this specifies the maximum number of retries. Defaults to 5.
         * @param {Number} [options.maxRetryDelay] If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
         * @param {String} [options.responseType] Override the response type
         * @param {Document|Object} [options.postdata] Data to send in the body of the request.
         * Some content types are handled automatically. If postdata is an XML Document, it is handled. If
         * the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
         * Otherwise, by default, the data is sent as form-urlencoded.
         * @param {Function} callback The callback used when the response has returned. Passed (err, data)
         * where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
         * err is the error code.
         * @returns {XMLHttpRequest} The request object.
         */
        request(method: string, url: string, options: {
            headers?: any;
            async?: boolean;
            cache?: any;
            withCredentials?: boolean;
            retry?: boolean;
            maxRetries?: number;
            maxRetryDelay?: number;
            responseType?: string;
            postdata?: Document | any;
        }, callback: (...params: any[]) => any): XMLHttpRequest;
    }
    /**
     * @name pc.http
     * @description Default instance of {@link pc.Http}.
     * @type pc.Http
     */
    var http: pc.Http;
    /**
     * @function
     * @name pc.createStyle
     * @description Creates a &lt;style&gt; DOM element from a string that contains CSS
     * @param {String} cssString A string that contains valid CSS
     * @example
     * var css = 'body {height: 100;}';
     * var style = pc.createStyle(css);
     * document.head.appendChild(style);
     * @returns {Element} The style DOM element
     */
    function createStyle(cssString: string): Element;
    /**
     * @interface pc.ResourceHandler
     * @description Interface for ResourceHandlers used by {@link pc.ResourceLoader}.
     */
    interface ResourceHandler {
        /**
         * @function
         * @name pc.ResourceHandler#load
         * @description Load a resource from a remote URL. When loaded (or failed),
         * use the callback to return an the raw resource data (or error).
         * @param {String} url The URL of the resource to load.
         * @param {Function} callback The callback used when the resource is loaded or an error occurs.
         * @param {pc.Asset} [asset] Optional asset that is passed by ResourceLoader.
         */
        load(url: string, callback: (...params: any[]) => any, asset?: pc.Asset): void;
        /**
         * @function
         * @name pc.ResourceHandler#open
         * @description Convert raw resource data into a resource instance. e.g. take 3D model format JSON and return a pc.Model.
         * @param {String} url The URL of the resource to open.
         * @param {*} data The raw resource data passed by callback from {@link pc.ResourceHandler#load}.
         * @param {pc.Asset} [asset] Optional asset that is passed by ResourceLoader.
         * @returns {*} The parsed resource data.
         */
        open(url: string, data: any, asset?: pc.Asset): any;
        /**
         * @function
         * @name pc.ResourceHandler#patch
         * @description Optional function to perform any operations on a resource, that requires a dependency on its asset data
         * or any other asset data.
         * @param {pc.Asset} asset The asset to patch.
         * @param {pc.AssetRegistry} assets The asset registry.
         */
        patch(asset: pc.Asset, assets: pc.AssetRegistry): void;
    }
    /**
     * @constructor
     * @name pc.ResourceLoader
     * @param {pc.Application} app The application
     * @classdesc Load resource data, potentially from remote sources. Caches resource on load to prevent
     * multiple requests. Add ResourceHandlers to handle different types of resources.
     */
    class ResourceLoader {
        constructor(app: pc.Application);
        /**
         * @function
         * @name pc.ResourceLoader#addHandler
         * @description Add a handler for a resource type. Handler should support: load(url, callback) and open(url, data).
         * Handlers can optionally support patch(asset, assets) to handle dependencies on other assets
         * @param {String} type The name of the type that the handler will load
         * @param {pc.ResourceHandler} handler An instance of a resource handler supporting load() and open().
         * @example
         * var loader = new ResourceLoader();
         * loader.addHandler("json", new pc.JsonHandler());
         */
        addHandler(type: string, handler: pc.ResourceHandler): void;
        /**
         * @function
         * @name pc.ResourceLoader#load
         * @description Make a request for a resource from a remote URL. Parse the returned data using the
         * handler for the specified type. When loaded and parsed, use the callback to return an instance of
         * the resource.
         * @param {String} url The URL of the resource to load.
         * @param {String} type The type of resource expected.
         * @param {Function} callback The callback used when the resource is loaded or an error occurs.
         * @param {pc.Asset} [asset] Optional asset that is passed into handler
         * Passed (err, resource) where err is null if there are no errors.
         * @example
         * app.loader.load("../path/to/texture.png", "texture", function (err, texture) {
         *     // use texture here
         * });
         */
        load(url: string, type: string, callback: (...params: any[]) => any, asset?: pc.Asset): void;
        /**
         * @function
         * @name pc.ResourceLoader#open
         * @description Convert raw resource data into a resource instance. e.g. take 3D model format JSON and return a pc.Model.
         * @param {String} type The type of resource.
         * @param {*} data The raw resource data.
         * @returns {*} The parsed resource data.
         */
        open(type: string, data: any): any;
        /**
         * @function
         * @name pc.ResourceLoader#patch
         * @description Perform any operations on a resource, that requires a dependency on its asset data
         * or any other asset data.
         * @param {pc.Asset} asset The asset to patch.
         * @param {pc.AssetRegistry} assets The asset registry.
         */
        patch(asset: pc.Asset, assets: pc.AssetRegistry): void;
        /**
         * @function
         * @name pc.ResourceLoader#getFromCache
         * @description Check cache for resource from a URL. If present, return the cached value.
         * @param {String} url The URL of the resource to get from the cache.
         * @param {String} type The type of the resource.
         * @returns {*} The resource loaded from the cache.
         */
        getFromCache(url: string, type: string): any;
        /**
         * @function
         * @name pc.ResourceLoader#destroy
         * @description Destroys the resource loader.
         */
        destroy(): void;
    }
    /**
     * @constructor
     * @name pc.ModelHandler
     * @classdesc Resource Handler for creating pc.Model resources
     * @description {@link pc.ResourceHandler} use to load 3D model resources
     * @param {pc.GraphicsDevice} device The graphics device that will be rendering
     * @param {pc.StandardMaterial} defaultMaterial The shared default material that is used in any place that a material is not specified
     */
    class ModelHandler {
        constructor(device: pc.GraphicsDevice, defaultMaterial: pc.StandardMaterial);
        /**
         * @function
         * @name pc.ModelHandler#load
         * @description Fetch model data from a remote url
         * @param {String} url The URL of the model data.
         * @param {Function} callback Callback function called when the load completes. The
         * callback is of the form fn(err, response), where err is a String error message in
         * the case where the load fails, and repsponse is the model data that has been
         * successfully loaded.
         */
        load(url: string, callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.ModelHandler#open
         * @description Process data in deserialized format into a pc.Model object.
         * @param {String} url The URL of the model data.
         * @param {Object} data The data from model file deserialized into a JavaScript Object.
         * @returns {pc.Model} The loaded model.
         */
        open(url: string, data: any): pc.Model;
        /**
         * @function
         * @name pc.ModelHandler#addParser
         * @description Add a parser that converts raw data into a {@link pc.Model}
         * Default parser is for JSON models
         * @param {Object} parser See JsonModelParser for example
         * @param {Function} decider Function that decides on which parser to use.
         * Function should take (url, data) arguments and return true if this parser should be used to parse the data into a {@link pc.Model}.
         * The first parser to return true is used.
         */
        addParser(parser: any, decider: (...params: any[]) => any): void;
    }
    /**
     * @constructor
     * @name pc.ScriptHandler
     * @classdesc ResourceHandler for loading JavaScript files dynamically
     * Two types of JavaScript files can be loaded, PlayCanvas scripts which contain calls to {@link pc.createScript},
     * or regular JavaScript files, such as third-party libraries.
     * @param {pc.Application} app The running {pc.Application}
     */
    class ScriptHandler {
        constructor(app: pc.Application);
    }
    /**
     * @constructor
     * @name pc.Batch
     * @classdesc Holds information about batched mesh instances. Created in {@link pc.BatchManager#create}.
     * @param {pc.MeshInstance[]} meshInstances The mesh instances to be batched.
     * @param {Boolean} dynamic Whether this batch is dynamic (supports transforming mesh instances at runtime).
     * @param {Number} batchGroupId Link this batch to a specific batch group. This is done automatically with default batches.
     * @property {pc.MeshInstance[]} origMeshInstances An array of original mesh instances, from which this batch was generated.
     * @property {pc.MeshInstance} meshInstance A single combined mesh instance, the result of batching.
     * @property {pc.Model} model A handy model object
     * @property {Boolean} dynamic Whether this batch is dynamic (supports transforming mesh instances at runtime).
     * @property {Number} [batchGroupId] Link this batch to a specific batch group. This is done automatically with default batches.
     */
    class Batch {
        constructor(meshInstances: pc.MeshInstance[], dynamic: boolean, batchGroupId: number);
    }
    /**
     * @constructor
     * @name pc.BatchGroup
     * @classdesc Holds mesh batching settings and a unique id. Created via {@link pc.BatchManager#addGroup}.
     * @param {Number} id Unique id. Can be assigned to model and element components.
     * @param {String} name The name of the group.
     * @param {Boolean} dynamic Whether objects within this batch group should support transforming at runtime.
     * @param {Number} maxAabbSize Maximum size of any dimension of a bounding box around batched objects.
     * {@link pc.BatchManager#prepare} will split objects into local groups based on this size.
     * @param {Number[]} [layers] Layer ID array. Default is [pc.LAYERID_WORLD]. The whole batch group will belong
     * to these layers. Layers of source models will be ignored.
     * @property {Boolean} dynamic Whether objects within this batch group should support transforming at runtime.
     * @property {Number} maxAabbSize Maximum size of any dimension of a bounding box around batched objects.
     * {@link pc.BatchManager#prepare} will split objects into local groups based on this size.
     * @property {Number} id Unique id. Can be assigned to model and element components.
     * @property {String} name Name of the group.
     * @property {Number[]} [layers] Layer ID array. Default is [pc.LAYERID_WORLD]. The whole batch group will belong
     * to these layers. Layers of source models will be ignored.
     */
    class BatchGroup {
        constructor(id: number, name: string, dynamic: boolean, maxAabbSize: number, layers?: Number[]);
    }
    /**
     * @constructor
     * @name pc.BatchManager
     * @classdesc Glues many mesh instances into a single one for better performance.
     * @param {pc.GraphicsDevice} device The graphics device used by the batch manager.
     * @param {pc.Entity} root The entity under which batched models are added.
     * @param {pc.Scene} scene The scene that the batch manager affects.
     */
    class BatchManager {
        constructor(device: pc.GraphicsDevice, root: pc.Entity, scene: pc.Scene);
        /**
         * @function
         * @name pc.BatchManager#addGroup
         * @description Adds new global batch group.
         * @param {String} name Custom name
         * @param {Boolean} dynamic Is this batch group dynamic? Will these objects move/rotate/scale after being batched?
         * @param {Number} maxAabbSize Maximum size of any dimension of a bounding box around batched objects.
         * {@link pc.BatchManager#prepare} will split objects into local groups based on this size.
         * @param {Number} [id] Optional custom unique id for the group (will be generated automatically otherwise).
         * @param {Number[]} [layers] Optional layer ID array. Default is [pc.LAYERID_WORLD]. The whole batch group will
         * belong to these layers. Layers of source models will be ignored.
         * @returns {pc.BatchGroup} Group object.
         */
        addGroup(name: string, dynamic: boolean, maxAabbSize: number, id?: number, layers?: Number[]): pc.BatchGroup;
        /**
         * @function
         * @name pc.BatchManager#removeGroup
         * @description Remove global batch group by id.
         * Note, this traverses the entire scene graph and clears the batch group id from all components
         * @param {String} id Group id
         */
        removeGroup(id: string): void;
        /**
         * @function
         * @name pc.BatchManager#getGroupByName
         * @description Retrieves a {@link pc.BatchGroup} object with a corresponding name, if it exists, or null otherwise.
         * @param {String} name Name
         * @returns {pc.BatchGroup} Group object.
         */
        getGroupByName(name: string): pc.BatchGroup;
        /**
         * @function
         * @name pc.BatchManager#generate
         * @description Destroys all batches and creates new based on scene models. Hides original models. Called by engine automatically on app start, and if batchGroupIds on models are changed.
         * @param {Number[]} [groupIds] Optional array of batch group IDs to update. Otherwise all groups are updated.
         */
        generate(groupIds?: Number[]): void;
        /**
         * @function
         * @name pc.BatchManager#prepare
         * @description Takes a list of mesh instances to be batched and sorts them into lists one for each draw call.
         * The input list will be split, if:
         * <ul>
         *     <li>Mesh instances use different materials</li>
         *     <li>Mesh instances have different parameters (e.g. lightmaps or static lights)</li>
         *     <li>Mesh instances have different shader defines (shadow receiving, being aligned to screen space, etc)</li>
         *     <li>Too many vertices for a single batch (65535 is maximum)</li>
         *     <li>Too many instances for a single batch (hardware-dependent, expect 128 on low-end and 1024 on high-end)</li>
         *     <li>Bounding box of a batch is larger than maxAabbSize in any dimension</li>
         * </ul>
         * @param {pc.MeshInstance[]} meshInstances Input list of mesh instances
         * @param {Boolean} dynamic Are we preparing for a dynamic batch? Instance count will matter then (otherwise not).
         * @param {Number} maxAabbSize Maximum size of any dimension of a bounding box around batched objects.
         * @param {Boolean} translucent Are we batching UI elements or sprites
         * This is useful to keep a balance between the number of draw calls and the number of drawn triangles, because smaller batches can be hidden when not visible in camera.
         * @returns {pc.MeshInstance[]} An array of arrays of mesh instances, each valid to pass to {@link pc.BatchManager#create}.
         */
        prepare(meshInstances: pc.MeshInstance[], dynamic: boolean, maxAabbSize: number, translucent: boolean): pc.MeshInstance[];
        /**
         * @function
         * @name pc.BatchManager#create
         * @description Takes a mesh instance list that has been prepared by {@link pc.BatchManager#prepare}, and returns a {@link pc.Batch} object. This method assumes that all mesh instances provided can be rendered in a single draw call.
         * @param {pc.MeshInstance[]} meshInstances Input list of mesh instances
         * @param {Boolean} dynamic Is it a static or dynamic batch? Will objects be transformed after batching?
         * @param {Number} [batchGroupId] Link this batch to a specific batch group. This is done automatically with default batches.
         * @returns {pc.Batch} The resulting batch object.
         */
        create(meshInstances: pc.MeshInstance[], dynamic: boolean, batchGroupId?: number): pc.Batch;
        /**
         * @function
         * @name pc.BatchManager#clone
         * @description Clones a batch. This method doesn't rebuild batch geometry, but only creates a new model and batch objects, linked to different source mesh instances.
         * @param {pc.Batch} batch A batch object
         * @param {pc.MeshInstance[]} clonedMeshInstances New mesh instances
         * @returns {pc.Batch} New batch object
         */
        clone(batch: pc.Batch, clonedMeshInstances: pc.MeshInstance[]): pc.Batch;
    }
    /**
     * @constructor
     * @name pc.ForwardRenderer
     * @classdesc The forward renderer render scene objects.
     * @description Creates a new forward renderer object.
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device used by the renderer.
     */
    class ForwardRenderer {
        constructor(graphicsDevice: pc.GraphicsDevice);
    }
    /**
     * @constructor
     * @name pc.GraphNode
     * @classdesc A hierarchical scene node.
     * @param {String} [name] The non-unique name of the graph node, default is "Untitled".
     * @property {String} name The non-unique name of a graph node.
     * @property {pc.Tags} tags Interface for tagging graph nodes. Tag based searches can be performed using the {@link pc.GraphNode#findByTag} function.
     */
    class GraphNode {
        constructor(name?: string);
        /**
         * @readonly
         * @name pc.GraphNode#right
         * @description The normalized local space X-axis vector of the graph node in world space.
         * @type pc.Vec3
         */
        readonly right: pc.Vec3;
        /**
         * @readonly
         * @name pc.GraphNode#up
         * @description The normalized local space Y-axis vector of the graph node in world space.
         * @type pc.Vec3
         */
        readonly up: pc.Vec3;
        /**
         * @readonly
         * @name pc.GraphNode#forward
         * @description The normalized local space negative Z-axis vector of the graph node in world space.
         * @type pc.Vec3
         */
        readonly forward: pc.Vec3;
        /**
         * @name pc.GraphNode#enabled
         * @type Boolean
         * @description Enable or disable a GraphNode. If one of the GraphNode's parents is disabled
         * there will be no other side effects. If all the parents are enabled then
         * the new value will activate / deactivate all the enabled children of the GraphNode.
         */
        enabled: boolean;
        /**
         * @readonly
         * @name pc.GraphNode#parent
         * @type pc.GraphNode
         * @description A read-only property to get a parent graph node
         */
        readonly parent: pc.GraphNode;
        /**
         * @readonly
         * @name pc.GraphNode#path
         * @type pc.GraphNode
         * @description A read-only property to get the path of the graph node relative to
         * the root of the hierarchy
         */
        readonly path: pc.GraphNode;
        /**
         * @readonly
         * @name pc.GraphNode#root
         * @type pc.GraphNode
         * @description A read-only property to get highest graph node from current node
         */
        readonly root: pc.GraphNode;
        /**
         * @readonly
         * @name pc.GraphNode#children
         * @type pc.GraphNode[]
         * @description A read-only property to get the children of this graph node.
         */
        readonly children: pc.GraphNode[];
        /**
         * @readonly
         * @name pc.GraphNode#graphDepth
         * @type Number
         * @description A read-only property to get the depth of this child within the graph. Note that for performance reasons this is only recalculated when a node is added to a new parent, i.e. it is not recalculated when a node is simply removed from the graph.
         */
        readonly graphDepth: number;
        /**
         * @function
         * @name pc.GraphNode#find
         * @description Search the graph node and all of its descendants for the nodes that satisfy some search criteria.
         * @param {Function|String} attr This can either be a function or a string. If it's a function, it is executed
         * for each descendant node to test if node satisfies the search logic. Returning true from the function will
         * include the node into the results. If it's a string then it represents the name of a field or a method of the
         * node. If this is the name of a field then the value passed as the second argument will be checked for equality.
         * If this is the name of a function then the return value of the function will be checked for equality against
         * the valued passed as the second argument to this function.
         * @param {Object} [value] If the first argument (attr) is a property name then this value will be checked against
         * the value of the property.
         * @returns {pc.GraphNode[]} The array of graph nodes that match the search criteria.
         * @example
         * // Finds all nodes that have a model component and have `door` in their lower-cased name
         * var doors = house.find(function(node) {
         *     return node.model && node.name.toLowerCase().indexOf('door') !== -1;
         * });
         * @example
         * // Finds all nodes that have the name property set to 'Test'
         * var entities = parent.find('name', 'Test');
         */
        find(attr: ((...params: any[]) => any) | string, value?: any): pc.GraphNode[];
        /**
         * @function
         * @name pc.GraphNode#findOne
         * @description Search the graph node and all of its descendants for the first node that satisfies some search criteria.
         * @param {Function|String} attr This can either be a function or a string. If it's a function, it is executed
         * for each descendant node to test if node satisfies the search logic. Returning true from the function will
         * result in that node being returned from findOne. If it's a string then it represents the name of a field or a method of the
         * node. If this is the name of a field then the value passed as the second argument will be checked for equality.
         * If this is the name of a function then the return value of the function will be checked for equality against
         * the valued passed as the second argument to this function.
         * @param {Object} [value] If the first argument (attr) is a property name then this value will be checked against
         * the value of the property.
         * @returns {pc.GraphNode} A graph node that match the search criteria.
         * @example
         * // Find the first node that is called `head` and has a model component
         * var head = player.findOne(function(node) {
         *     return node.model && node.name === 'head';
         * });
         * @example
         * // Finds the first node that has the name property set to 'Test'
         * var node = parent.findOne('name', 'Test');
         */
        findOne(attr: ((...params: any[]) => any) | string, value?: any): pc.GraphNode;
        /**
         * @function
         * @name pc.GraphNode#findByTag
         * @description Return all graph nodes that satisfy the search query.
         * Query can be simply a string, or comma separated strings,
         * to have inclusive results of assets that match at least one query.
         * A query that consists of an array of tags can be used to match graph nodes that have each tag of array
         * @param {String} query Name of a tag or array of tags
         * @returns {pc.GraphNode[]} A list of all graph nodes that match the query
         * @example
         * // Return all graph nodes that tagged by `animal`
         * var animals = node.findByTag("animal");
         * @example
         * // Return all graph nodes that tagged by `bird` OR `mammal`
         * var birdsAndMammals = node.findByTag("bird", "mammal");
         * @example
         * // Return all assets that tagged by `carnivore` AND `mammal`
         * var meatEatingMammals = node.findByTag([ "carnivore", "mammal" ]);
         * @example
         * // Return all assets that tagged by (`carnivore` AND `mammal`) OR (`carnivore` AND `reptile`)
         * var meatEatingMammalsAndReptiles = node.findByTag([ "carnivore", "mammal" ], [ "carnivore", "reptile" ]);
         */
        findByTag(query: string): pc.GraphNode[];
        /**
         * @function
         * @name pc.GraphNode#findByName
         * @description Get the first node found in the graph with the name. The search
         * is depth first.
         * @param {String} name The name of the graph.
         * @returns {pc.GraphNode} The first node to be found matching the supplied name.
         */
        findByName(name: string): pc.GraphNode;
        /**
         * @function
         * @name pc.GraphNode#findByPath
         * @description Get the first node found in the graph by its full path in the graph.
         * The full path has this form 'parent/child/sub-child'. The search is depth first.
         * @param {String} path The full path of the pc.GraphNode.
         * @returns {pc.GraphNode} The first node to be found matching the supplied path.
         * @example
         * var path = this.entity.findByPath('child/another_child');
         */
        findByPath(path: string): pc.GraphNode;
        /**
         * @function
         * @name pc.GraphNode#forEach
         * @description Executes a provided function once on this graph node and all of its descendants.
         * @param {Function} callback The function to execute on the graph node and each descendant.
         * @param {Object} [thisArg] Optional value to use as this when executing callback function.
         * @example
         * // Log the path and name of each node in descendant tree starting with "parent"
         * parent.forEach(function (node) {
         *     console.log(node.path + "/" + node.name);
         * });
         */
        forEach(callback: (...params: any[]) => any, thisArg?: any): void;
        /**
         * @function
         * @name pc.GraphNode#isDescendantOf
         * @description Check if node is descendant of another node.
         * @param {pc.GraphNode} node Potential ancestor of node.
         * @returns {Boolean} if node is descendant of another node.
         * @example
         * if (roof.isDescendantOf(house)) {
         *     // roof is descendant of house entity
         * }
         */
        isDescendantOf(node: pc.GraphNode): boolean;
        /**
         * @function
         * @name pc.GraphNode#isAncestorOf
         * @description Check if node is ancestor for another node.
         * @param {pc.GraphNode} node Potential descendant of node.
         * @returns {Boolean} if node is ancestor for another node
         * @example
         * if (body.isAncestorOf(foot)) {
         *     // foot is within body's hierarchy
         * }
         */
        isAncestorOf(node: pc.GraphNode): boolean;
        /**
         * @function
         * @name pc.GraphNode#getEulerAngles
         * @description Get the world space rotation for the specified GraphNode in Euler angle
         * form. The order of the returned Euler angles is XYZ. The value returned by this function
         * should be considered read-only. In order to set the world-space rotation of the graph
         * node, use {@link pc.GraphNode#setEulerAngles}.
         * @returns {pc.Vec3} The world space rotation of the graph node in Euler angle form.
         * @example
         * var angles = this.entity.getEulerAngles(); // [0,0,0]
         * angles[1] = 180; // rotate the entity around Y by 180 degrees
         * this.entity.setEulerAngles(angles);
         */
        getEulerAngles(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalEulerAngles
         * @description Get the rotation in local space for the specified GraphNode. The rotation
         * is returned as euler angles in a 3-dimensional vector where the order is XYZ. The
         * returned vector should be considered read-only. To update the local rotation, use
         * {@link pc.GraphNode#setLocalEulerAngles}.
         * @returns {pc.Vec3} The local space rotation of the graph node as euler angles in XYZ order.
         * @example
         * var angles = this.entity.getLocalEulerAngles();
         * angles[1] = 180;
         * this.entity.setLocalEulerAngles(angles);
         */
        getLocalEulerAngles(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalPosition
         * @description Get the position in local space for the specified GraphNode. The position
         * is returned as a 3-dimensional vector. The returned vector should be considered read-only.
         * To update the local position, use {@link pc.GraphNode#setLocalPosition}.
         * @returns {pc.Vec3} The local space position of the graph node.
         * @example
         * var position = this.entity.getLocalPosition();
         * position[0] += 1; // move the entity 1 unit along x.
         * this.entity.setLocalPosition(position);
         */
        getLocalPosition(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalRotation
         * @description Get the rotation in local space for the specified GraphNode. The rotation
         * is returned as a quaternion. The returned quaternion should be considered read-only.
         * To update the local rotation, use {@link pc.GraphNode#setLocalRotation}.
         * @returns {pc.Quat} The local space rotation of the graph node as a quaternion.
         * @example
         * var rotation = this.entity.getLocalRotation();
         */
        getLocalRotation(): pc.Quat;
        /**
         * @function
         * @name pc.GraphNode#getLocalScale
         * @description Get the scale in local space for the specified GraphNode. The scale
         * is returned as a 3-dimensional vector. The returned vector should be considered read-only.
         * To update the local scale, use {@link pc.GraphNode#setLocalScale}.
         * @returns {pc.Vec3} The local space scale of the graph node.
         * @example
         * var scale = this.entity.getLocalScale();
         * scale.x = 100;
         * this.entity.setLocalScale(scale);
         */
        getLocalScale(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getLocalTransform
         * @description Get the local transform matrix for this graph node. This matrix
         * is the transform relative to the node's parent's world transformation matrix.
         * @returns {pc.Mat4} The node's local transformation matrix.
         * @example
         * var transform = this.entity.getLocalTransform();
         */
        getLocalTransform(): pc.Mat4;
        /**
         * @function
         * @name pc.GraphNode#getPosition
         * @description Get the world space position for the specified GraphNode. The
         * value returned by this function should be considered read-only. In order to set
         * the world-space position of the graph node, use {@link pc.GraphNode#setPosition}.
         * @returns {pc.Vec3} The world space position of the graph node.
         * @example
         * var position = this.entity.getPosition();
         * position.x = 10;
         * this.entity.setPosition(position);
         */
        getPosition(): pc.Vec3;
        /**
         * @function
         * @name pc.GraphNode#getRotation
         * @description Get the world space rotation for the specified GraphNode in quaternion
         * form. The value returned by this function should be considered read-only. In order
         * to set the world-space rotation of the graph node, use {@link pc.GraphNode#setRotation}.
         * @returns {pc.Quat} The world space rotation of the graph node as a quaternion.
         * @example
         * var rotation = this.entity.getRotation();
         */
        getRotation(): pc.Quat;
        /**
         * @function
         * @name pc.GraphNode#getWorldTransform
         * @description Get the world transformation matrix for this graph node.
         * @returns {pc.Mat4} The node's world transformation matrix.
         * @example
         * var transform = this.entity.getWorldTransform();
         */
        getWorldTransform(): pc.Mat4;
        /**
         * @function
         * @name pc.GraphNode#reparent
         * @description Remove graph node from current parent and add as child to new parent
         * @param {pc.GraphNode} parent New parent to attach graph node to
         * @param {Number} index (optional) The child index where the child node should be placed.
         */
        reparent(parent: pc.GraphNode, index: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalEulerAngles
         * @description Sets the local-space rotation of the specified graph node using euler angles.
         * Eulers are interpreted in XYZ order. Eulers must be specified in degrees. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * local-space euler rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding eulers or rotation around local-space
         * x-axis in degrees.
         * @param {Number} [y] - rotation around local-space y-axis in degrees.
         * @param {Number} [z] - rotation around local-space z-axis in degrees.
         * @example
         * // Set rotation of 90 degrees around y-axis via 3 numbers
         * this.entity.setLocalEulerAngles(0, 90, 0);
         * @example
         * // Set rotation of 90 degrees around y-axis via a vector
         * var angles = new pc.Vec3(0, 90, 0);
         * this.entity.setLocalEulerAngles(angles);
         */
        setLocalEulerAngles(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalPosition
         * @description Sets the local-space position of the specified graph node. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * local-space position.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space position or
         * x-coordinate of local-space position.
         * @param {Number} [y] - y-coordinate of local-space position.
         * @param {Number} [z] - z-coordinate of local-space position.
         * @example
         * // Set via 3 numbers
         * this.entity.setLocalPosition(0, 10, 0);
         * @example
         * // Set via vector
         * var pos = new pc.Vec3(0, 10, 0);
         * this.entity.setLocalPosition(pos)
         */
        setLocalPosition(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalRotation
         * @description Sets the local-space rotation of the specified graph node. This function
         * has two valid signatures: you can either pass a quaternion or 3 numbers to specify the
         * local-space rotation.
         * @param {pc.Quat|Number} x - quaternion holding local-space rotation or x-component of
         * local-space quaternion rotation.
         * @param {Number} [y] - y-component of local-space quaternion rotation.
         * @param {Number} [z] - z-component of local-space quaternion rotation.
         * @param {Number} [w] - w-component of local-space quaternion rotation.
         * @example
         * // Set via 4 numbers
         * this.entity.setLocalRotation(0, 0, 0, 1);
         * @example
         * // Set via quaternion
         * var q = pc.Quat();
         * this.entity.setLocalRotation(q);
         */
        setLocalRotation(x: pc.Quat | number, y?: number, z?: number, w?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setLocalScale
         * @description Sets the local-space scale factor of the specified graph node. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * local-space scale.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space scale or x-coordinate
         * of local-space scale.
         * @param {Number} [y] - y-coordinate of local-space scale.
         * @param {Number} [z] - z-coordinate of local-space scale.
         * @example
         * // Set via 3 numbers
         * this.entity.setLocalScale(10, 10, 10);
         * @example
         * // Set via vector
         * var scale = new pc.Vec3(10, 10, 10);
         * this.entity.setLocalScale(scale);
         */
        setLocalScale(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setPosition
         * @description Sets the world-space position of the specified graph node. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * world-space position.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding world-space position or
         * x-coordinate of world-space position.
         * @param {Number} [y] - y-coordinate of world-space position.
         * @param {Number} [z] - z-coordinate of world-space position.
         * @example
         * // Set via 3 numbers
         * this.entity.setPosition(0, 10, 0);
         * @example
         * // Set via vector
         * var position = new pc.Vec3(0, 10, 0);
         * this.entity.setPosition(position);
         */
        setPosition(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setRotation
         * @description Sets the world-space rotation of the specified graph node. This function
         * has two valid signatures: you can either pass a quaternion or 3 numbers to specify the
         * world-space rotation.
         * @param {pc.Quat|Number} x - quaternion holding world-space rotation or x-component of
         * world-space quaternion rotation.
         * @param {Number} [y] - y-component of world-space quaternion rotation.
         * @param {Number} [z] - z-component of world-space quaternion rotation.
         * @param {Number} [w] - w-component of world-space quaternion rotation.
         * @example
         * // Set via 4 numbers
         * this.entity.setRotation(0, 0, 0, 1);
         * @example
         * // Set via quaternion
         * var q = pc.Quat();
         * this.entity.setRotation(q);
         */
        setRotation(x: pc.Quat | number, y?: number, z?: number, w?: number): void;
        /**
         * @function
         * @name pc.GraphNode#setEulerAngles
         * @description Sets the world-space rotation of the specified graph node using euler angles.
         * Eulers are interpreted in XYZ order. Eulers must be specified in degrees. This function
         * has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
         * world-space euler rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding eulers or rotation around world-space
         * x-axis in degrees.
         * @param {Number} [y] - rotation around world-space y-axis in degrees.
         * @param {Number} [z] - rotation around world-space z-axis in degrees.
         * @example
         * // Set rotation of 90 degrees around world-space y-axis via 3 numbers
         * this.entity.setEulerAngles(0, 90, 0);
         * @example
         * // Set rotation of 90 degrees around world-space y-axis via a vector
         * var angles = new pc.Vec3(0, 90, 0);
         * this.entity.setEulerAngles(angles);
         */
        setEulerAngles(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#addChild
         * @description Add a new child to the child list and update the parent value of the child node
         * @param {pc.GraphNode} node The new child to add
         * @example
         * var e = new pc.Entity(app);
         * this.entity.addChild(e);
         */
        addChild(node: pc.GraphNode): void;
        /**
         * @function
         * @name pc.GraphNode#insertChild
         * @description Insert a new child to the child list at the specified index and update the parent value of the child node
         * @param {pc.GraphNode} node The new child to insert
         * @param {Number} index The index in the child list of the parent where the new node will be inserted
         * @example
         * var e = new pc.Entity(app);
         * this.entity.insertChild(e, 1);
         */
        insertChild(node: pc.GraphNode, index: number): void;
        /**
         * @function
         * @name pc.GraphNode#removeChild
         * @description Remove the node from the child list and update the parent value of the child.
         * @param {pc.GraphNode} child The node to remove.
         * @example
         * var child = this.entity.children[0];
         * this.entity.removeChild(child);
         */
        removeChild(child: pc.GraphNode): void;
        /**
         * @function
         * @name pc.GraphNode#lookAt
         * @description Reorients the graph node so that the negative z-axis points towards the target.
         * This function has two valid signatures. Either pass 3D vectors for the look at coordinate and up
         * vector, or pass numbers to represent the vectors.
         * @param {pc.Vec3|Number} x - If passing a 3D vector, this is the world-space coordinate to look at.
         * Otherwise, it is the x-component of the world-space coordinate to look at.
         * @param {pc.Vec3|Number} y - If passing a 3D vector, this is the world-space up vector for look at
         * transform. Otherwise, it is the y-component of the world-space coordinate to look at.
         * @param {Number} z - z-component of the world-space coordinate to look at.
         * @param {Number} [ux=0] - x-component of the up vector for the look at transform.
         * @param {Number} [uy=1] - y-component of the up vector for the look at transform.
         * @param {Number} [uz=0] - z-component of the up vector for the look at transform.
         * @example
         * // Look at another entity, using the (default) positive y-axis for up
         * var position = otherEntity.getPosition();
         * this.entity.lookAt(position);
         * @example
         * // Look at another entity, using the negative world y-axis for up
         * var position = otherEntity.getPosition();
         * this.entity.lookAt(position, pc.Vec3.DOWN);
         * @example
         * // Look at the world space origin, using the (default) positive y-axis for up
         * this.entity.lookAt(0, 0, 0);
         * @example
         * // Look at world-space coordinate [10, 10, 10], using the negative world y-axis for up
         * this.entity.lookAt(10, 10, 10, 0, -1, 0);
         */
        lookAt(x: pc.Vec3 | number, y: pc.Vec3 | number, z: number, ux?: number, uy?: number, uz?: number): void;
        /**
         * @function
         * @name pc.GraphNode#translate
         * @description Translates the graph node in world-space by the specified translation vector.
         * This function has two valid signatures: you can either pass a 3D vector or 3 numbers to
         * specify the world-space translation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding world-space translation or
         * x-coordinate of world-space translation.
         * @param {Number} [y] - y-coordinate of world-space translation.
         * @param {Number} [z] - z-coordinate of world-space translation.
         * @example
         * // Translate via 3 numbers
         * this.entity.translate(10, 0, 0);
         * @example
         * // Translate via vector
         * var t = new pc.Vec3(10, 0, 0);
         * this.entity.translate(t);
         */
        translate(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#translateLocal
         * @description Translates the graph node in local-space by the specified translation vector.
         * This function has two valid signatures: you can either pass a 3D vector or 3 numbers to
         * specify the local-space translation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space translation or
         * x-coordinate of local-space translation.
         * @param {Number} [y] - y-coordinate of local-space translation.
         * @param {Number} [z] - z-coordinate of local-space translation.
         * @example
         * // Translate via 3 numbers
         * this.entity.translateLocal(10, 0, 0);
         * @example
         * // Translate via vector
         * var t = new pc.Vec3(10, 0, 0);
         * this.entity.translateLocal(t);
         */
        translateLocal(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#rotate
         * @description Rotates the graph node in world-space by the specified Euler angles.
         * Eulers are specified in degrees in XYZ order. This function has two valid signatures:
         * you can either pass a 3D vector or 3 numbers to specify the world-space rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding world-space rotation or
         * rotation around world-space x-axis in degrees.
         * @param {Number} [y] - Rotation around world-space y-axis in degrees.
         * @param {Number} [z] - Rotation around world-space z-axis in degrees.
         * @example
         * // Rotate via 3 numbers
         * this.entity.rotate(0, 90, 0);
         * @example
         * // Rotate via vector
         * var r = new pc.Vec3(0, 90, 0);
         * this.entity.rotate(r);
         */
        rotate(x: pc.Vec3 | number, y?: number, z?: number): void;
        /**
         * @function
         * @name pc.GraphNode#rotateLocal
         * @description Rotates the graph node in local-space by the specified Euler angles.
         * Eulers are specified in degrees in XYZ order. This function has two valid signatures:
         * you can either pass a 3D vector or 3 numbers to specify the local-space rotation.
         * @param {pc.Vec3|Number} x - 3-dimensional vector holding local-space rotation or
         * rotation around local-space x-axis in degrees.
         * @param {Number} [y] - Rotation around local-space y-axis in degrees.
         * @param {Number} [z] - Rotation around local-space z-axis in degrees.
         * @example
         * // Rotate via 3 numbers
         * this.entity.rotateLocal(0, 90, 0);
         * @example
         * // Rotate via vector
         * var r = new pc.Vec3(0, 90, 0);
         * this.entity.rotateLocal(r);
         */
        rotateLocal(x: pc.Vec3 | number, y?: number, z?: number): void;
    }
    /**
     * @constructor
     * @name pc.LayerComposition
     * @classdesc Layer Composition is a collection of {@link pc.Layer} that is fed to {@link pc.Scene#layers} to define rendering order.
     * @description Create a new layer composition.
     * @property {pc.Layer[]} layerList A read-only array of {@link pc.Layer} sorted in the order they will be rendered.
     * @property {Boolean[]} subLayerList A read-only array of boolean values, matching {@link pc.Layer#layerList}.
     * True means only semi-transparent objects are rendered, and false means opaque.
     * @property {Boolean[]} subLayerEnabled A read-only array of boolean values, matching {@link pc.Layer#layerList}.
     * True means the layer is rendered, false means it's skipped.
     * @property {pc.CameraComponent[]} cameras A read-only array of {@link pc.CameraComponent} that can be used during rendering, e.g. inside
     * {@link pc.Layer#onPreCull}, {@link pc.Layer#onPostCull}, {@link pc.Layer#onPreRender}, {@link pc.Layer#onPostRender}.
     */
    class LayerComposition {
        /**
         * @function
         * @name pc.LayerComposition#push
         * @description Adds a layer (both opaque and semi-transparent parts) to the end of the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to add.
         */
        push(layer: pc.Layer): void;
        /**
         * @function
         * @name pc.LayerComposition#insert
         * @description Inserts a layer (both opaque and semi-transparent parts) at the chosen index in the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to add.
         * @param {Number} index Insertion position.
         */
        insert(layer: pc.Layer, index: number): void;
        /**
         * @function
         * @name pc.LayerComposition#remove
         * @description Removes a layer (both opaque and semi-transparent parts) from {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to remove.
         */
        remove(layer: pc.Layer): void;
        /**
         * @function
         * @name pc.LayerComposition#pushOpaque
         * @description Adds part of the layer with opaque (non semi-transparent) objects to the end of the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to add.
         */
        pushOpaque(layer: pc.Layer): void;
        /**
         * @function
         * @name pc.LayerComposition#insertOpaque
         * @description Inserts an opaque part of the layer (non semi-transparent mesh instances) at the chosen index in the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to add.
         * @param {Number} index Insertion position.
         */
        insertOpaque(layer: pc.Layer, index: number): void;
        /**
         * @function
         * @name pc.LayerComposition#removeOpaque
         * @description Removes an opaque part of the layer (non semi-transparent mesh instances) from {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to remove.
         */
        removeOpaque(layer: pc.Layer): void;
        /**
         * @function
         * @name pc.LayerComposition#pushTransparent
         * @description Adds part of the layer with semi-transparent objects to the end of the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to add.
         */
        pushTransparent(layer: pc.Layer): void;
        /**
         * @function
         * @name pc.LayerComposition#insertTransparent
         * @description Inserts a semi-transparent part of the layer at the chosen index in the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to add.
         * @param {Number} index Insertion position.
         */
        insertTransparent(layer: pc.Layer, index: number): void;
        /**
         * @function
         * @name pc.LayerComposition#removeTransparent
         * @description Removes a transparent part of the layer from {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to remove.
         */
        removeTransparent(layer: pc.Layer): void;
        /**
         * @function
         * @name pc.LayerComposition#getOpaqueIndex
         * @description Gets index of the opaque part of the supplied layer in the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to find index of.
         * @returns {Number} The index of the opaque part of the specified layer.
         */
        getOpaqueIndex(layer: pc.Layer): number;
        /**
         * @function
         * @name pc.LayerComposition#getTransparentIndex
         * @description Gets index of the semi-transparent part of the supplied layer in the {@link pc.Layer#layerList}.
         * @param {pc.Layer} layer A {@link pc.Layer} to find index of.
         * @returns {Number} The index of the semi-transparent part of the specified layer.
         */
        getTransparentIndex(layer: pc.Layer): number;
        /**
         * @function
         * @name pc.LayerComposition#getLayerById
         * @description Finds a layer inside this composition by its ID. null is returned, if nothing is found.
         * @param {Number} id An ID of the layer to find.
         * @returns {pc.Layer} The layer corresponding to the specified ID. Returns null if layer is not found.
         */
        getLayerById(id: number): pc.Layer;
        /**
         * @function
         * @name pc.LayerComposition#getLayerByName
         * @description Finds a layer inside this composition by its name. null is returned, if nothing is found.
         * @param {String} name The name of the layer to find.
         * @returns {pc.Layer} The layer corresponding to the specified name. Returns null if layer is not found.
         */
        getLayerByName(name: string): pc.Layer;
        /**
         * @function
         * @name pc.LayerComposition#sortTransparentLayers
         * @description Used to determine which array of layers has any transparent sublayer that is on top of all the transparent sublayers in the other array.
         * @param {Number[]} layersA IDs of layers
         * @param {Number[]} layersB IDs of layers
         * @returns {Number} Returns a negative number if any of the transparent sublayers in layersA is on top of all the transparent sublayers in layersB,
         * or a positive number if any of the transparent sublayers in layersB is on top of all the transparent sublayers in layersA, or 0 otherwise.
         */
        sortTransparentLayers(layersA: Number[], layersB: Number[]): number;
        /**
         * @function
         * @name pc.LayerComposition#sortOpaqueLayers
         * @description Used to determine which array of layers has any opaque sublayer that is on top of all the opaque sublayers in the other array.
         * @param {Number[]} layersA IDs of layers
         * @param {Number[]} layersB IDs of layers
         * @returns {Number} Returns a negative number if any of the opaque sublayers in layersA is on top of all the opaque sublayers in layersB,
         * or a positive number if any of the opaque sublayers in layersB is on top of all the opaque sublayers in layersA, or 0 otherwise.
         */
        sortOpaqueLayers(layersA: Number[], layersB: Number[]): number;
    }
    /**
     * @constructor
     * @name pc.Layer
     * @classdesc Layer represents a renderable subset of the scene. It can contain a list of mesh instances, lights and cameras,
     * their render settings and also defines custom callbacks before, after or during rendering.
     * Layers are organized inside {@link pc.LayerComposition} in a desired order.
     * @description Create a new layer.
     * @param {Object} options Object for passing optional arguments. These arguments are the same as properties of the Layer.
     * @property {Boolean} enabled Enable the layer. Disabled layers are skipped. Defaults to true.
     * @property {String} name Name of the layer. Can be used in {@link pc.LayerComposition#getLayerByName}.
     * @property {Number} opaqueSortMode Defines the method used for sorting opaque (that is, not semi-transparent) mesh instances before rendering.
     * Possible values are:
     * <ul>
     *     <li>{@link pc.SORTMODE_NONE}</li>
     *     <li>{@link pc.SORTMODE_MANUAL}</li>
     *     <li>{@link pc.SORTMODE_MATERIALMESH}</li>
     *     <li>{@link pc.SORTMODE_BACK2FRONT}</li>
     *     <li>{@link pc.SORTMODE_FRONT2BACK}</li>
     * </ul>
     * Defaults to pc.SORTMODE_MATERIALMESH.
     * @property {Number} transparentSortMode Defines the method used for sorting semi-transparent mesh instances before rendering.
     * Possible values are:
     * <ul>
     *     <li>{@link pc.SORTMODE_NONE}</li>
     *     <li>{@link pc.SORTMODE_MANUAL}</li>
     *     <li>{@link pc.SORTMODE_MATERIALMESH}</li>
     *     <li>{@link pc.SORTMODE_BACK2FRONT}</li>
     *     <li>{@link pc.SORTMODE_FRONT2BACK}</li>
     * </ul>
     * Defaults to pc.SORTMODE_BACK2FRONT.
     * @property {pc.RenderTarget} renderTarget Render target to which rendering is performed. If not set, will render simply to the screen.
     * @property {Number} shaderPass A type of shader to use during rendering. Possible values are:
     * <ul>
     *     <li>{@link pc.SHADER_FORWARD}</li>
     *     <li>{@link pc.SHADER_FORWARDHDR}</li>
     *     <li>{@link pc.SHADER_DEPTH}</li>
     *     <li>Your own custom value. Should be in 19 - 31 range. Use {@link pc.StandardMaterial#onUpdateShader} to apply shader modifications based on this value.</li>
     * </ul>
     * Defaults to pc.SHADER_FORWARD.
     * @property {Boolean} passThrough Tells that this layer is simple and needs to just render a bunch of mesh instances without lighting, skinning and morphing (faster).
     *
     * @property {Boolean} overrideClear Defines if layer should use camera clear parameters (true) or ignore them and use {@link pc.Layer#clearColor}, {@link pc.Layer#clearColorBuffer},
     * {@link pc.Layer#clearDepthBuffer} and {@link pc.Layer#clearStencilBuffer}.
     * @property {pc.Color} clearColor The color used to clear the canvas to before each camera starts to render.
     * @property {Boolean} clearColorBuffer If true cameras will clear the color buffer to the color set in clearColor.
     * @property {Boolean} clearDepthBuffer If true cameras will clear the depth buffer.
     * @property {Boolean} clearStencilBuffer If true cameras will clear the stencil buffer.
     *
     * @property {pc.Layer} layerReference Make this layer render the same mesh instances that another layer does instead of having its own mesh instance list.
     * Both layers must share cameras. Frustum culling is only performed for one layer.
     * @property {Function} cullingMask Visibility mask that interacts with {@link pc.MeshInstance#mask}.
     * @property {Function} onEnable Custom function that is called after the layer has been enabled.
     * This happens when:
     * <ul>
     *     <li>The layer is created with {@link pc.Layer#enabled} set to true (which is the default value).</li>
     *     <li>{@link pc.Layer#enabled} was changed from false to true</li>
     *     <li>{@link pc.Layer#incrementCounter} was called and incremented the counter above zero.</li>
     * </ul>
     * Useful for allocating resources this layer will use (e.g. creating render targets).
     * @property {Function} onDisable Custom function that is called after the layer has been disabled.
     * This happens when:
     * <ul>
     *     <li>{@link pc.Layer#enabled} was changed from true to false</li>
     *     <li>{@link pc.Layer#decrementCounter} was called and set the counter to zero.</li>
     * </ul>
     * @property {Function} onPreCull Custom function that is called before visibility culling is performed for this layer.
     * Useful, for example, if you want to modify camera projection while still using the same camera and make frustum culling work correctly with it
     * (see {@link pc.CameraComponent#calculateTransform} and {@link pc.CameraComponent#calculateProjection}).
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onPostCull Custom function that is called after visibiliy culling is performed for this layer.
     * Useful for reverting changes done in {@link pc.Layer#onPreCull} and determining final mesh instance visibility (see {@link pc.MeshInstance#visibleThisFrame}).
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onPreRender Custom function that is called before this layer is rendered.
     * Useful, for example, for reacting on screen size changes.
     * This function is called before the first occurrence of this layer in {@link pc.LayerComposition}.
     * It will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onPreRenderOpaque Custom function that is called before opaque mesh instances (not semi-transparent) in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onPreRenderTransparent Custom function that is called before semi-transparent mesh instances in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onPostRender Custom function that is called after this layer is rendered.
     * Useful to revert changes made in {@link pc.Layer#onPreRender} or performing some processing on {@link pc.Layer#renderTarget}.
     * This function is called after the last occurrence of this layer in {@link pc.LayerComposition}.
     * It will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onPostRenderOpaque Custom function that is called after opaque mesh instances (not semi-transparent) in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onPostRenderTransparent Custom function that is called after semi-transparent mesh instances in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link pc.LayerComposition#cameras} with this index.
     * @property {Function} onDrawCall Custom function that is called before every mesh instance in this layer is rendered.
     * It is not recommended to set this function when rendering many objects every frame due to performance reasons.
     * @property {Function} id A unique ID of the layer.
     * Layer IDs are stored inside {@link pc.ModelComponent#layers}, {@link pc.CameraComponent#layers}, {@link pc.LightComponent#layers} and {@link pc.ElementComponent#layers} instead of names.
     * Can be used in {@link pc.LayerComposition#getLayerById}.
     */
    class Layer {
        constructor(options: any);
        /**
         * @function
         * @name pc.Layer#addMeshInstances
         * @description Adds an array of mesh instances to this layer.
         * @param {pc.MeshInstance[]} meshInstances Array of {@link pc.MeshInstance}.
         * @param {Boolean} [skipShadowCasters] Set it to true if you don't want these mesh instances to cast shadows in this layer.
         */
        addMeshInstances(meshInstances: pc.MeshInstance[], skipShadowCasters?: boolean): void;
        /**
         * @function
         * @name pc.Layer#removeMeshInstances
         * @description Removes multiple mesh instances from this layer.
         * @param {pc.MeshInstance[]} meshInstances Array of {@link pc.MeshInstance}. If they were added to this layer, they will be removed.
         * @param {Boolean} [skipShadowCasters] Set it to true if you want to still cast shadows from removed mesh instances or if they never did cast shadows before.
         */
        removeMeshInstances(meshInstances: pc.MeshInstance[], skipShadowCasters?: boolean): void;
        /**
         * @function
         * @name pc.Layer#clearMeshInstances
         * @description Removes all mesh instances from this layer.
         * @param {Boolean} [skipShadowCasters] Set it to true if you want to still cast shadows from removed mesh instances or if they never did cast shadows before.
         */
        clearMeshInstances(skipShadowCasters?: boolean): void;
        /**
         * @function
         * @name pc.Layer#addLight
         * @description Adds a light to this layer.
         * @param {pc.LightComponent} light A {@link pc.LightComponent}.
         */
        addLight(light: pc.LightComponent): void;
        /**
         * @function
         * @name pc.Layer#removeLight
         * @description Removes a light from this layer.
         * @param {pc.LightComponent} light A {@link pc.LightComponent}.
         */
        removeLight(light: pc.LightComponent): void;
        /**
         * @function
         * @name pc.Layer#clearLights
         * @description Removes all lights from this layer.
         */
        clearLights(): void;
        /**
         * @function
         * @name pc.Layer#addShadowCasters
         * @description Adds an array of mesh instances to this layer, but only as shadow casters (they will not be rendered anywhere, but only cast shadows on other objects).
         * @param {pc.MeshInstance[]} meshInstances Array of {@link pc.MeshInstance}.
         */
        addShadowCasters(meshInstances: pc.MeshInstance[]): void;
        /**
         * @function
         * @name pc.Layer#removeShadowCasters
         * @description Removes multiple mesh instances from the shadow casters list of this layer, meaning they will stop casting shadows.
         * @param {pc.MeshInstance[]} meshInstances Array of {@link pc.MeshInstance}. If they were added to this layer, they will be removed.
         */
        removeShadowCasters(meshInstances: pc.MeshInstance[]): void;
        /**
         * @function
         * @name pc.Layer#addCamera
         * @description Adds a camera to this layer.
         * @param {pc.CameraComponent} camera A {@link pc.CameraComponent}.
         */
        addCamera(camera: pc.CameraComponent): void;
        /**
         * @function
         * @name pc.Layer#removeCamera
         * @description Removes a camera from this layer.
         * @param {pc.CameraComponent} camera A {@link pc.CameraComponent}.
         */
        removeCamera(camera: pc.CameraComponent): void;
        /**
         * @function
         * @name pc.Layer#clearCameras
         * @description Removes all cameras from this layer.
         */
        clearCameras(): void;
    }
    /**
     * @constructor
     * @name pc.Lightmapper
     * @classdesc The lightmapper is used to bake scene lights into textures.
     * @param {pc.GraphicsDevice} device The grahpics device used by the lightmapper.
     * @param {pc.Entity} root The root entity of the scene.
     * @param {pc.Scene} scene The scene to lightmap.
     * @param {pc.ForwardRenderer} renderer The renderer.
     * @param {pc.AssetRegistry} assets Registry of assets to lightmap.
     */
    class Lightmapper {
        constructor(device: pc.GraphicsDevice, root: pc.Entity, scene: pc.Scene, renderer: pc.ForwardRenderer, assets: pc.AssetRegistry);
        /**
         * @function
         * @name pc.Lightmapper#bake
         * @description Generates and applies the lightmaps.
         * @param {pc.Entity} nodes An array of models to render lightmaps for. If not supplied, full scene will be baked.
         * @param {Number} mode Baking mode. Possible values:
         * <ul>
         *     <li>pc.BAKE_COLOR: single color lightmap
         *     <li>pc.BAKE_COLORDIR: single color lightmap + dominant light direction (used for bump/specular)
         * </ul>
         * Only lights with bakeDir=true will be used for generating the dominant light direction.
         */
        bake(nodes: pc.Entity, mode: number): void;
    }
    /**
     * @constructor
     * @name pc.BasicMaterial
     * @classdesc A Basic material is for rendering unlit geometry, either using a constant color or a
     * color map modulated with a color.
     * @property {pc.Color} color The flat color of the material (RGBA, where each component is 0 to 1).
     * @property {pc.Texture} colorMap The color map of the material. If specified, the color map is
     * modulated by the color property.
     * @example
     * // Create a new Basic material
     * var material = new pc.BasicMaterial();
     *
     * // Set the material to have a texture map that is multiplied by a red color
     * material.color.set(1, 0, 0);
     * material.colorMap = diffuseMap;
     *
     * // Notify the material that it has been modified
     * material.update();
     *
     * @extends pc.Material
     */
    class BasicMaterial extends pc.Material {
        /**
         * @function
         * @name pc.BasicMaterial#clone
         * @description Duplicates a Basic material. All properties are duplicated except textures
         * where only the references are copied.
         * @returns {pc.BasicMaterial} A cloned Basic material.
         */
        clone(): pc.BasicMaterial;
        /**
         * @function
         * @name pc.Material#update
         * @description Applies any changes made to the material's properties.
         */
        update(): void;
        /**
         * @function
         * @name pc.Material#getParameter
         * @description Retrieves the specified shader parameter from a material.
         * @param {String} name The name of the parameter to query.
         * @returns {Object} The named parameter.
         */
        getParameter(name: string): any;
        /**
         * @function
         * @name pc.Material#setParameter
         * @description Sets a shader parameter on a material.
         * @param {String} name The name of the parameter to set.
         * @param {Number|Number[]|pc.Texture} data The value for the specified parameter.
         * @param {Number} [passFlags] Mask describing which passes the material should be included in.
         */
        setParameter(name: string, data: number | Number[] | pc.Texture, passFlags?: number): void;
        /**
         * @function
         * @name pc.Material#deleteParameter
         * @description Deletes a shader parameter on a material.
         * @param {String} name The name of the parameter to delete.
         */
        deleteParameter(name: string): void;
        /**
         * @function
         * @name pc.Material#setParameters
         * @description Pushes all material parameters into scope.
         */
        setParameters(): void;
        /**
         * @function
         * @name pc.Material#destroy
         * @description Removes this material from the scene and possibly frees up memory from its shaders (if there are no other materials using it).
         */
        destroy(): void;
    }
    /**
     * @constructor
     * @name pc.Material
     * @classdesc A material determines how a particular mesh instance is rendered. It specifies the shader and render state that is
     * set before the mesh instance is submitted to the graphics device.
     * @description Create a new Material instance
     * @property {Number} alphaTest The alpha test reference value to control which fragments are written to the currently
     * active render target based on alpha value. All fragments with an alpha value of less than the alphaTest reference value
     * will be discarded. alphaTest defaults to 0 (all fragments pass).
     * @property {Boolean} alphaToCoverage Enables or disables alpha to coverage (WebGL2 only). When enabled, and if hardware anti-aliasing is on,
     * limited order-independent transparency can be achieved. Quality depends on the number of MSAA samples of the current render target.
     * It can nicely soften edges of otherwise sharp alpha cutouts, but isn't recommended for large area semi-transparent surfaces.
     * Note, that you don't need to enable blending to make alpha to coverage work. It will work without it, just like alphaTest.
     * @property {Boolean} alphaWrite If true, the alpha component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the alpha component will not be written. Defaults to true.
     * @property {Number} blendType Controls how primitives are blended when being written to the currently active render target.
     * Can be one of the following values:
     * <ul>
     * <li>{@link pc.BLEND_SUBTRACTIVE}: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer.</li>
     * <li>{@link pc.BLEND_ADDITIVE}: Add the color of the source fragment to the destination fragment and write the result to the frame buffer.</li>
     * <li>{@link pc.BLEND_NORMAL}: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of pc.BLENDMODE_SRC_ALPHA and a destination blend mode of pc.BLENDMODE_ONE_MINUS_SRC_ALPHA.</li>
     * <li>{@link pc.BLEND_NONE}: Disable blending.</li>
     * <li>{@link pc.BLEND_PREMULTIPLIED}: Similar to pc.BLEND_NORMAL expect the source fragment is assumed to have already been multiplied by the source alpha value.</li>
     * <li>{@link pc.BLEND_MULTIPLICATIVE}: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer.</li>
     * <li>{@link pc.BLEND_ADDITIVEALPHA}: Same as pc.BLEND_ADDITIVE except the source RGB is multiplied by the source alpha.</li>
     * </ul>
     * Defaults to pc.BLEND_NONE.
     * @property {Boolean} blueWrite If true, the blue component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the blue component will not be written. Defaults to true.
     * @property {Number} cull Controls how triangles are culled based on their face direction with respect to the viewpoint.
     * Can be one of the following values:
     * <ul>
     * <li>{@link pc.CULLFACE_NONE}: Do not cull triangles based on face direction.</li>
     * <li>{@link pc.CULLFACE_BACK}: Cull the back faces of triangles (do not render triangles facing away from the view point).</li>
     * <li>{@link pc.CULLFACE_FRONT}: Cull the front faces of triangles (do not render triangles facing towards the view point).</li>
     * <li>{@link pc.CULLFACE_FRONTANDBACK}: Cull both front and back faces (triangles will not be rendered).</li>
     * </ul>
     * Defaults to pc.CULLFACE_BACK.
     * @property {Boolean} depthTest If true, fragments generated by the shader of this material are only written to the
     * current render target if they pass the depth test. If false, fragments generated by the shader of this material are
     * written to the current render target regardless of what is in the depth buffer. Defaults to true.
     * @property {Boolean} depthWrite If true, fragments generated by the shader of this material write a depth value to
     * the depth buffer of the currently active render target. If false, no depth value is written. Defaults to true.
     * @property {Boolean} greenWrite If true, the green component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the green component will not be written. Defaults to true.
     * @property {String} name The name of the material.
     * @property {Boolean} redWrite If true, the red component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the red component will not be written. Defaults to true.
     * @property {pc.Shader} shader The shader used by this material to render mesh instances.
     * @property {pc.StencilParameters} stencilFront Stencil parameters for front faces (default is null).
     * @property {pc.StencilParameters} stencilBack Stencil parameters for back faces (default is null).
     * @property {Number} depthBias Offsets the output depth buffer value. Useful for decals to prevent z-fighting.
     * @property {Number} slopeDepthBias Same as {@link pc.Material#depthBias}, but also depends on the slope of the triangle relative to the camera.
     */
    class Material {
        /**
         * @function
         * @name pc.Material#update
         * @description Applies any changes made to the material's properties.
         */
        update(): void;
        /**
         * @function
         * @name pc.Material#getParameter
         * @description Retrieves the specified shader parameter from a material.
         * @param {String} name The name of the parameter to query.
         * @returns {Object} The named parameter.
         */
        getParameter(name: string): any;
        /**
         * @function
         * @name pc.Material#setParameter
         * @description Sets a shader parameter on a material.
         * @param {String} name The name of the parameter to set.
         * @param {Number|Number[]|pc.Texture} data The value for the specified parameter.
         * @param {Number} [passFlags] Mask describing which passes the material should be included in.
         */
        setParameter(name: string, data: number | Number[] | pc.Texture, passFlags?: number): void;
        /**
         * @function
         * @name pc.Material#deleteParameter
         * @description Deletes a shader parameter on a material.
         * @param {String} name The name of the parameter to delete.
         */
        deleteParameter(name: string): void;
        /**
         * @function
         * @name pc.Material#setParameters
         * @description Pushes all material parameters into scope.
         */
        setParameters(): void;
        /**
         * @function
         * @name pc.Material#destroy
         * @description Removes this material from the scene and possibly frees up memory from its shaders (if there are no other materials using it).
         */
        destroy(): void;
    }
    /**
     * @constructor
     * @name pc.StandardMaterial
     * @classdesc A Standard material is the main, general purpose material that is most often used for rendering.
     * It can approximate a wide variety of surface types and can simulate dynamic reflected light.
     * Most maps can use 3 types of input values in any combination: constant (color or number), mesh vertex colors and a texture. All enabled inputs are multiplied together.
     *
     * @property {pc.Color} ambient The ambient color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
     *
     * @property {pc.Color} diffuse The diffuse color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
     * Defines basic surface color (aka albedo).
     * @property {Boolean} diffuseTint Multiply diffuse map and/or diffuse vertex color by the constant diffuse value.
     * @property {pc.Texture} diffuseMap The diffuse map of the material.
     * @property {Number} diffuseMapUv Diffuse map UV channel
     * @property {pc.Vec2} diffuseMapTiling Controls the 2D tiling of the diffuse map.
     * @property {pc.Vec2} diffuseMapOffset Controls the 2D offset of the diffuse map. Each component is between 0 and 1.
     * @property {String} diffuseMapChannel Color channels of the diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     * @property {Boolean} diffuseVertexColor Use mesh vertex colors for diffuse. If diffuseMap or are diffuseTint are set, they'll be multiplied by vertex colors.
     * @property {String} diffuseVertexColorChannel Vertex color channels to use for diffuse. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     *
     * @property {pc.Color} specular The specular color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
     * Defines surface reflection/specular color. Affects specular intensity and tint.
     * @property {Boolean} specularTint Multiply specular map and/or specular vertex color by the constant specular value.
     * @property {pc.Texture} specularMap The specular map of the material.
     * @property {Number} specularMapUv Specular map UV channel
     * @property {pc.Vec2} specularMapTiling Controls the 2D tiling of the specular map.
     * @property {pc.Vec2} specularMapOffset Controls the 2D offset of the specular map. Each component is between 0 and 1.
     * @property {String} specularMapChannel Color channels of the specular map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     * @property {Boolean} specularVertexColor Use mesh vertex colors for specular. If specularMap or are specularTint are set, they'll be multiplied by vertex colors.
     * @property {String} specularVertexColorChannel Vertex color channels to use for specular. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     *
     * @property {Boolean} useMetalness Use metalness properties instead of specular.
     * When enabled, diffuse colors also affect specular instead of the dedicated specular map.
     * This can be used as alternative to specular color to save space.
     * With metaless == 0, the pixel is assumed to be dielectric, and diffuse color is used as normal.
     * With metaless == 1, the pixel is fully metallic, and diffuse color is used as specular color instead.
     * @property {Number} metalness Defines how much the surface is metallic. From 0 (dielectric) to 1 (metal).
     * @property {pc.Texture} metalnessMap Monochrome metalness map.
     * @property {Number} metalnessMapUv Metalness map UV channel
     * @property {pc.Vec2} metalnessMapTiling Controls the 2D tiling of the metalness map.
     * @property {pc.Vec2} metalnessMapOffset Controls the 2D offset of the metalness map. Each component is between 0 and 1.
     * @property {String} metalnessMapChannel Color channel of the metalness map to use. Can be "r", "g", "b" or "a".
     * @property {Boolean} metalnessVertexColor Use mesh vertex colors for metalness. If metalnessMap is set, it'll be multiplied by vertex colors.
     * @property {String} metalnessVertexColorChannel Vertex color channel to use for metalness. Can be "r", "g", "b" or "a".
     *
     * @property {Number} shininess Defines glossiness of the material from 0 (rough) to 100 (shiny mirror).
     * A higher shininess value results in a more focused specular highlight.
     * Glossiness map/vertex colors are always multiplied by this value (normalized to 0 - 1 range), or it is used directly as constant output.
     * @property {pc.Texture} glossMap Glossiness map. If set, will be multiplied by normalized 'shininess' value and/or vertex colors.
     * @property {Number} glossMapUv Gloss map UV channel
     * @property {String} glossMapChannel Color channel of the gloss map to use. Can be "r", "g", "b" or "a".
     * @property {pc.Vec2} glossMapTiling Controls the 2D tiling of the gloss map.
     * @property {pc.Vec2} glossMapOffset Controls the 2D offset of the gloss map. Each component is between 0 and 1.
     * @property {Boolean} glossVertexColor Use mesh vertex colors for glossiness. If glossMap is set, it'll be multiplied by vertex colors.
     * @property {String} glossVertexColorChannel Vertex color channel to use for glossiness. Can be "r", "g", "b" or "a".
     *
     * @property {Number} refraction Defines the visibility of refraction. Material can refract the same cube map as used for reflections.
     * @property {Number} refractionIndex Defines the index of refraction, i.e. the amount of distortion.
     * The value is calculated as (outerIor / surfaceIor), where inputs are measured indices of refraction, the one around the object and the one of it's own surface.
     * In most situations outer medium is air, so outerIor will be approximately 1. Then you only need to do (1.0 / surfaceIor).
     *
     * @property {pc.Color} emissive The emissive color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
     * @property {Boolean} emissiveTint Multiply emissive map and/or emissive vertex color by the constant emissive value.
     * @property {pc.Texture} emissiveMap The emissive map of the material. Can be HDR.
     * @property {Number} emissiveIntensity Emissive color multiplier.
     * @property {Number} emissiveMapUv Emissive map UV channel.
     * @property {pc.Vec2} emissiveMapTiling Controls the 2D tiling of the emissive map.
     * @property {pc.Vec2} emissiveMapOffset Controls the 2D offset of the emissive map. Each component is between 0 and 1.
     * @property {String} emissiveMapChannel Color channels of the emissive map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     * @property {Boolean} emissiveVertexColor Use mesh vertex colors for emission. If emissiveMap or emissiveTint are set, they'll be multiplied by vertex colors.
     * @property {String} emissiveVertexColorChannel Vertex color channels to use for emission. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     *
     * @property {Number} opacity The opacity of the material. This value can be between 0 and 1, where 0 is fully
     * transparent and 1 is fully opaque. If you want the material to be semi-transparent you also need to
     * set the {@link pc.Material#blendType} to pc.BLEND_NORMAL, pc.BLEND_ADDITIVE or any other mode.
     * Also note that for most semi-transparent objects you want {@link pc.Material#depthWrite} to be false, otherwise they can fully occlude objects behind them.
     * @property {pc.Texture} opacityMap The opacity map of the material.
     * @property {Number} opacityMapUv Opacity map UV channel
     * @property {String} opacityMapChannel Color channel of the opacity map to use. Can be "r", "g", "b" or "a".
     * @property {pc.Vec2} opacityMapTiling Controls the 2D tiling of the opacity map.
     * @property {pc.Vec2} opacityMapOffset Controls the 2D offset of the opacity map. Each component is between 0 and 1.
     * @property {Boolean} opacityVertexColor Use mesh vertex colors for opacity. If opacityMap is set, it'll be multiplied by vertex colors.
     * @property {String} opacityVertexColorChannel Vertex color channels to use for opacity. Can be "r", "g", "b" or "a".
     *
     * @property {pc.Texture} normalMap The normal map of the material.
     * The texture must contains normalized, tangent space normals.
     * @property {Number} normalMapUv Normal map UV channel
     * @property {pc.Vec2} normalMapTiling Controls the 2D tiling of the normal map.
     * @property {pc.Vec2} normalMapOffset Controls the 2D offset of the normal map. Each component is between 0 and 1.
     * @property {Number} bumpiness The bumpiness of the material. This value scales the assigned normal map.
     * It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect.
     *
     * @property {pc.Texture} heightMap The height map of the material. Used for a view-dependent parallax effect.
     * The texture must represent the height of the surface where darker pixels are lower and lighter pixels are higher.
     * It is recommended to use it together with a normal map.
     * @property {Number} heightMapUv Height map UV channel
     * @property {String} heightMapChannel Color channel of the height map to use. Can be "r", "g", "b" or "a".
     * @property {pc.Vec2} heightMapTiling Controls the 2D tiling of the height map.
     * @property {pc.Vec2} heightMapOffset Controls the 2D offset of the height map. Each component is between 0 and 1.
     * @property {Number} heightMapFactor Height map multiplier. Affects the strength of the parallax effect.
     *
     * @property {pc.Texture} sphereMap The spherical environment map of the material. Affects reflections.
     * @property {pc.Texture} cubeMap The cubic environment map of the material. Overrides sphereMap. Affects reflections. If cubemap is prefiltered, will also affect ambient color.
     * @property {Number} cubeMapProjection The type of projection applied to the cubeMap property:
     * <ul>
     *     <li>{@link pc.CUBEPROJ_NONE}: The cube map is treated as if it is infinitely far away.</li>
     *     <li>{@link pc.CUBEPROJ_BOX}: Box-projection based on a world space axis-aligned bounding box.</li>
     * </ul>
     * Defaults to pc.CUBEPROJ_NONE.
     * @property {pc.BoundingBox} cubeMapProjectionBox The world space axis-aligned bounding box defining the
     * box-projection used for the cubeMap property. Only used when cubeMapProjection is set to pc.CUBEPROJ_BOX.
     * @property {Number} reflectivity Environment map intensity.
     *
     * @property {pc.Texture} lightMap A custom lightmap of the material. Lightmaps are textures that contain pre-rendered lighting. Can be HDR.
     * @property {Number} lightMapUv Lightmap UV channel
     * @property {String} lightMapChannel Color channels of the lightmap to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     * @property {pc.Vec2} lightMapTiling Controls the 2D tiling of the lightmap.
     * @property {pc.Vec2} lightMapOffset Controls the 2D offset of the lightmap. Each component is between 0 and 1.
     * @property {Boolean} lightVertexColor Use baked vertex lighting. If lightMap is set, it'll be multiplied by vertex colors.
     * @property {String} lightVertexColorChannel Vertex color channels to use for baked lighting. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     *
     * @property {Boolean} ambientTint Enables scene ambient multiplication by material ambient color.
     * @property {pc.Texture} aoMap Baked ambient occlusion (AO) map. Modulates ambient color.
     * @property {Number} aoMapUv AO map UV channel
     * @property {String} aoMapChannel Color channel of the AO map to use. Can be "r", "g", "b" or "a".
     * @property {pc.Vec2} aoMapTiling Controls the 2D tiling of the AO map.
     * @property {pc.Vec2} aoMapOffset Controls the 2D offset of the AO map. Each component is between 0 and 1.
     * @property {Boolean} aoVertexColor Use mesh vertex colors for AO. If aoMap is set, it'll be multiplied by vertex colors.
     * @property {String} aoVertexColorChannel Vertex color channels to use for AO. Can be "r", "g", "b" or "a".
     * @property {Number} occludeSpecular Uses ambient occlusion to darken specular/reflection. It's a hack, because real specular occlusion is view-dependent. However, it can be better than nothing.
     * <ul>
     *     <li>{@link pc.SPECOCC_NONE}: No specular occlusion</li>
     *     <li>{@link pc.SPECOCC_AO}: Use AO directly to occlude specular.</li>
     *     <li>{@link pc.SPECOCC_GLOSSDEPENDENT}: Modify AO based on material glossiness/view angle to occlude specular.</li>
     * </ul>
     * @property {Number} occludeSpecularIntensity Controls visibility of specular occlusion.
     * @property {Number} occludeDirect Tells if AO should darken directional lighting.
     *
     * @property {Boolean} specularAntialias Enables Toksvig AA for mipmapped normal maps with specular.
     * @property {Boolean} conserveEnergy Defines how diffuse and specular components are combined when Fresnel is on.
     * It is recommended that you leave this option enabled, although you may want to disable it in case when all reflection comes only from a few light sources, and you don't use an environment map, therefore having mostly black reflection.
     * @property {Number} shadingModel Defines the shading model.
     * <ul>
     *     <li>{@link pc.SPECULAR_PHONG}: Phong without energy conservation. You should only use it as a backwards compatibility with older projects.</li>
     *     <li>{@link pc.SPECULAR_BLINN}: Energy-conserving Blinn-Phong.</li>
     * </ul>
     * @property {Number} fresnelModel Defines the formula used for Fresnel effect.
     * As a side-effect, enabling any Fresnel model changes the way diffuse and reflection components are combined.
     * When Fresnel is off, legacy non energy-conserving combining is used. When it is on, combining behaviour is defined by conserveEnergy parameter.
     * <ul>
     *     <li>{@link pc.FRESNEL_NONE}: No Fresnel.</li>
     *     <li>{@link pc.FRESNEL_SCHLICK}: Schlick's approximation of Fresnel (recommended). Parameterized by specular color.</li>
     * </ul>
     * @property {Boolean} useFog Apply fogging (as configured in scene settings)
     * @property {Boolean} useLighting Apply lighting
     * @property {Boolean} useSkybox Apply scene skybox as prefiltered environment map
     * @property {Boolean} useGammaTonemap Apply gamma correction and tonemapping (as configured in scene settings)
     * @property {Boolean} pixelSnap Align vertices to pixel co-ordinates when rendering. Useful for pixel perfect 2D graphics
     * @property {Boolean} twoSidedLighting Calculate proper normals (and therefore lighting) on backfaces
     *
     * @property {Function} onUpdateShader A custom function that will be called after all shader generator properties are collected and before shader code is generated.
     * This function will receive an object with shader generator settings (based on current material and scene properties), that you can change and then return.
     * Returned value will be used instead. This is mostly useful when rendering the same set of objects, but with different shader variations based on the same material.
     * For example, you may wish to render a depth or normal pass using textures assigned to the material, a reflection pass with simpler shaders and so on.
     * Properties of the object passed into this function are:
     * <ul>
     *     <li>pass: value of {@link pc.Layer#shaderPass} of the Layer being rendered.</li>
     *     <li>chunks: Object containing custom shader chunks that will replace default ones.</li>
     *     <li>customFragmentShader: Completely replace fragment shader with this code.</li>
     *     <li>forceUv1: if UV1 (second set of texture coordinates) is required in the shader. Will be declared as "vUv1" and passed to the fragment shader.</li>
     *     <li>fog: the type of fog being applied in the shader. See {@link pc.Scene#fog} for the list of possible values.</li>
     *     <li>gamma: the type of gamma correction being applied in the shader. See {@link pc.Scene#gammaCorrection} for the list of possible values.</li>
     *     <li>toneMap: the type of tone mapping being applied in the shader. See {@link pc.Scene#toneMapping} for the list of possible values.</li>
     *     <li>ambientTint: the value of {@link pc.StandardMaterial#ambientTint}.</li>
     *     <li>specularAntialias: the value of {@link pc.StandardMaterial#specularAntialias}.</li>
     *     <li>conserveEnergy: the value of {@link pc.StandardMaterial#conserveEnergy}.</li>
     *     <li>occludeSpecular: the value of {@link pc.StandardMaterial#occludeSpecular}.</li>
     *     <li>occludeDirect: the value of {@link pc.StandardMaterial#occludeDirect}.</li>
     *     <li>shadingModel: the value of {@link pc.StandardMaterial#shadingModel}.</li>
     *     <li>fresnelModel: the value of {@link pc.StandardMaterial#fresnelModel}.</li>
     *     <li>cubeMapProjection: the value of {@link pc.StandardMaterial#cubeMapProjection}.</li>
     *     <li>useMetalness: the value of {@link pc.StandardMaterial#useMetalness}.</li>
     *     <li>blendType: the value of {@link pc.Material#blendType}.</li>
     *     <li>twoSidedLighting: the value of {@link pc.Material#twoSidedLighting}.</li>
     *     <li>diffuseTint: defines if {@link pc.StandardMaterial#diffuse} constant should affect diffuse color.</li>
     *     <li>specularTint: defines if {@link pc.StandardMaterial#specular} constant should affect specular color.</li>
     *     <li>metalnessTint: defines if {@link pc.StandardMaterial#metalness} constant should affect metalness value.</li>
     *     <li>glossTint: defines if {@link pc.StandardMaterial#shininess} constant should affect glossiness value.</li>
     *     <li>emissiveTint: defines if {@link pc.StandardMaterial#emissive} constant should affect emission value.</li>
     *     <li>opacityTint: defines if {@link pc.StandardMaterial#opacity} constant should affect opacity value.</li>
     *     <li>occludeSpecularFloat: defines if {@link pc.StandardMaterial#occludeSpecularIntensity} constant should affect specular occlusion.</li>
     *     <li>alphaTest: enable alpha testing. See {@link pc.Material#alphaTest}.</li>
     *     <li>alphaToCoverage: enable alpha to coverage. See {@link pc.Material#alphaToCoverage}.</li>
     *     <li>sphereMap: if {@link pc.StandardMaterial#sphereMap} is used.</li>
     *     <li>cubeMap: if {@link pc.StandardMaterial#cubeMap} is used.</li>
     *     <li>dpAtlas: if dual-paraboloid reflection is used. Dual paraboloid reflections replace prefiltered cubemaps on certain platform (mostly Android) for performance reasons.</li>
     *     <li>ambientSH: if ambient spherical harmonics are used. Ambient SH replace prefiltered cubemap ambient on certain platform (mostly Android) for performance reasons.</li>
     *     <li>useSpecular: if any specular or reflections are needed at all.</li>
     *     <li>rgbmAmbient: if ambient cubemap or spherical harmonics are RGBM-encoded.</li>
     *     <li>hdrAmbient: if ambient cubemap or spherical harmonics are plain float HDR data.</li>
     *     <li>rgbmReflection: if reflection cubemap or dual paraboloid are RGBM-encoded.</li>
     *     <li>hdrReflection: if reflection cubemap or dual paraboloid are plain float HDR data.</li>
     *     <li>fixSeams: if cubemaps require seam fixing (see {@link pc.Texture#options.fixCubemapSeams}).</li>
     *     <li>prefilteredCubemap: if prefiltered cubemaps are used.</li>
     *     <li>emissiveFormat: how emissiveMap must be sampled. This value is based on {@link pc.Texture#options.rgbm} and {@link pc.Texture#options.format}. Possible values are:</li>
     *     <ul>
     *          <li>0: sRGB texture</li>
     *          <li>1: RGBM-encoded HDR texture</li>
     *          <li>2: Simple read (no conversion from sRGB)</li>
     *     </ul>
     *     <li>lightMapFormat: how lightMap must be sampled. This value is based on {@link pc.Texture#options.rgbm} and {@link pc.Texture#options.format}. Possible values are:</li>
     *     <ul>
     *          <li>0: sRGB texture</li>
     *          <li>1: RGBM-encoded HDR texture</li>
     *          <li>2: Simple read (no conversion from sRGB)</li>
     *     </ul>
     *     <li>useRgbm: if decodeRGBM() function is needed in the shader at all.</li>
     *     <li>packedNormal: if normal map contains X in RGB, Y in Alpha, and Z must be reconstructed.</li>
     *     <li>forceFragmentPrecision: Override fragment shader numeric precision. Can be "lowp", "mediump", "highp" or null to use default.</li>
     *     <li>fastTbn: Use slightly cheaper normal mapping code (skip tangent space normalization). Can look buggy sometimes.</li>
     *     <li>refraction: if refraction is used.</li>
     *     <li>skyboxIntensity: if reflected skybox intensity should be modulated.</li>
     *     <li>useTexCubeLod: if textureCubeLodEXT function should be used to read prefiltered cubemaps. Usually true of iOS, false on other devices due to quality/performance balance.</li>
     * </ul>
     *
     * @example
     * // Create a new Standard material
     * var material = new pc.StandardMaterial();
     *
     * // Update the material's diffuse and specular properties
     * material.diffuse.set(1, 0, 0);
     * material.specular.set(1, 1, 1);
     *
     * // Notify the material that it has been modified
     * material.update();
     *
     * @extends pc.Material
     */
    class StandardMaterial extends pc.Material {
        /**
         * @function
         * @name pc.StandardMaterial#clone
         * @description Duplicates a Standard material. All properties are duplicated except textures
         * where only the references are copied.
         * @returns {pc.StandardMaterial} A cloned Standard material.
         */
        clone(): pc.StandardMaterial;
        /**
         * @function
         * @name pc.Material#update
         * @description Applies any changes made to the material's properties.
         */
        update(): void;
        /**
         * @function
         * @name pc.Material#getParameter
         * @description Retrieves the specified shader parameter from a material.
         * @param {String} name The name of the parameter to query.
         * @returns {Object} The named parameter.
         */
        getParameter(name: string): any;
        /**
         * @function
         * @name pc.Material#setParameter
         * @description Sets a shader parameter on a material.
         * @param {String} name The name of the parameter to set.
         * @param {Number|Number[]|pc.Texture} data The value for the specified parameter.
         * @param {Number} [passFlags] Mask describing which passes the material should be included in.
         */
        setParameter(name: string, data: number | Number[] | pc.Texture, passFlags?: number): void;
        /**
         * @function
         * @name pc.Material#deleteParameter
         * @description Deletes a shader parameter on a material.
         * @param {String} name The name of the parameter to delete.
         */
        deleteParameter(name: string): void;
        /**
         * @function
         * @name pc.Material#setParameters
         * @description Pushes all material parameters into scope.
         */
        setParameters(): void;
        /**
         * @function
         * @name pc.Material#destroy
         * @description Removes this material from the scene and possibly frees up memory from its shaders (if there are no other materials using it).
         */
        destroy(): void;
    }
    /**
     * @constructor
     * @name pc.Mesh
     * @classdesc A graphical primitive. The mesh is defined by a {@link pc.VertexBuffer} and an optional
     * {@link pc.IndexBuffer}. It also contains a primitive definition which controls the type of the
     * primitive and the portion of the vertex or index buffer to use.
     * @description Create a new mesh.
     * @property {pc.VertexBuffer} vertexBuffer The vertex buffer holding the vertex data of the mesh.
     * @property {pc.IndexBuffer[]} indexBuffer An array of index buffers. For unindexed meshes, this array can
     * be empty. The first index buffer in the array is used by {@link pc.MeshInstance}s with a renderStyle
     * property set to pc.RENDERSTYLE_SOLID. The second index buffer in the array is used if renderStyle is
     * set to pc.RENDERSTYLE_WIREFRAME.
     * @property {Object[]} primitive Array of primitive objects defining how vertex (and index) data in the
     * mesh should be interpreted by the graphics device. For details on the primitive object, see
     * {@link pc.GraphicsDevice#draw}. The primitive is ordered based on render style like the indexBuffer property.
     * @property {pc.BoundingBox} aabb The axis-aligned bounding box for the object space vertices of this mesh.
     */
    class Mesh {
    }
    /**
     * @constructor
     * @name pc.MeshInstance
     * @classdesc An instance of a {@link pc.Mesh}. A single mesh can be referenced by many
     * mesh instances that can have different transforms and materials.
     * @description Create a new mesh instance.
     * @param {pc.GraphNode} node The graph node defining the transform for this instance.
     * @param {pc.Mesh} mesh The graphics mesh being instanced.
     * @param {pc.Material} material The material used to render this instance.
     * @example
     * // Create a mesh instance pointing to a 1x1x1 'cube' mesh
     * var mesh = pc.createBox(graphicsDevice);
     * var material = new pc.StandardMaterial();
     * var node = new pc.GraphNode();
     * var meshInstance = new pc.MeshInstance(node, mesh, material);
     * @property {pc.BoundingBox} aabb The world space axis-aligned bounding box for this
     * mesh instance.
     * @property {Boolean} castShadow Controls whether the mesh instance casts shadows.
     * Defaults to false.
     * @property {Boolean} visible Enable rendering for this mesh instance. Use visible property to enable/disable rendering without overhead of removing from scene.
     * But note that the mesh instance is still in the hierarchy and still in the draw call list.
     * @property {pc.Material} material The material used by this mesh instance.
     * @property {Number} renderStyle The render style of the mesh instance. Can be:
     * <ul>
     *     <li>pc.RENDERSTYLE_SOLID</li>
     *     <li>pc.RENDERSTYLE_WIREFRAME</li>
     *     <li>pc.RENDERSTYLE_POINTS</li>
     * </ul>
     * Defaults to pc.RENDERSTYLE_SOLID.
     * @property {Boolean} cull Controls whether the mesh instance can be culled by with frustum culling ({@link pc.CameraComponent#frustumCulling}).
     * @property {Number} drawOrder Use this value to affect rendering order of mesh instances.
     * Only used when mesh instances are added to a {@link pc.Layer} with {@link pc.Layer#opaqueSortMode} or {@link pc.Layer#transparentSortMode} (depending on the material) set to {@link pc.SORTMODE_MANUAL}.
     * @property {Boolean} visibleThisFrame Read this value in {@link pc.Layer#onPostCull} to determine if the object is actually going to be rendered.
     */
    class MeshInstance {
        constructor(node: pc.GraphNode, mesh: pc.Mesh, material: pc.Material);
        /**
         * @name pc.MeshInstance#mask
         * @type Number
         * @description Mask controlling which {@link pc.LightComponent}s light this mesh instance, which {@link pc.CameraComponent} sees it and in which {@link pc.Layer} it is rendered.
         * Defaults to 1.
         */
        mask: number;
    }
    /**
     * @constructor
     * @name pc.Model
     * @classdesc A model is a graphical object that can be added to or removed from a scene.
     * It contains a hierarchy and any number of mesh instances.
     * @description Creates a new model.
     * @example
     * // Create a new model
     * var model = new pc.Model();
     * @property {pc.GraphNode} graph The root node of the model's graph node hierarchy.
     * @property {pc.MeshInstance[]} meshInstances An array of meshInstances contained in this model.
     */
    class Model {
        /**
         * @function
         * @name pc.Model#clone
         * @description Clones a model. The returned model has a newly created hierarchy
         * and mesh instances, but meshes are shared between the clone and the specified
         * model.
         * @returns {pc.Model} A clone of the specified model.
         * @example
         * var clonedModel = model.clone();
         */
        clone(): pc.Model;
        /**
         * @function
         * @name pc.Model#destroy
         * @description destroys skinning texture and possibly deletes vertex/index buffers of a model.
         * Mesh is reference-counted, so buffers are only deleted if all models with referencing mesh instances were deleted.
         * That means all in-scene models + the "base" one (asset.resource) which is created when the model is parsed.
         * It is recommended to use asset.unload() instead, which will also remove the model from the scene.
         */
        destroy(): void;
        /**
         * @function
         * @name pc.Model#generateWireframe
         * @description Generates the necessary internal data for a model to be
         * renderable as wireframe. Once this function has been called, any mesh
         * instance in the model can have its renderStyle property set to
         * pc.RENDERSTYLE_WIREFRAME
         * @example
         * model.generateWireframe();
         * for (var i = 0; i < model.meshInstances.length; i++) {
         *     model.meshInstances[i].renderStyle = pc.RENDERSTYLE_WIREFRAME;
         * }
         */
        generateWireframe(): void;
    }
    /**
     * @constructor
     * @name pc.Picker
     * @classdesc Picker object used to select mesh instances from screen coordinates.
     * @description Create a new instance of a Picker object
     * @param {pc.Application} app The application managing this picker instance.
     * @param {Number} width The width of the pick buffer in pixels.
     * @param {Number} height The height of the pick buffer in pixels.
     * @property {Number} width Width of the pick buffer in pixels (read-only).
     * @property {Number} height Height of the pick buffer in pixels (read-only).
     * @property {pc.RenderTarget} renderTarget The render target used by the picker internally (read-only).
     */
    class Picker {
        constructor(app: pc.Application, width: number, height: number);
        /**
         * @function
         * @name pc.Picker#getSelection
         * @description Return the list of mesh instances selected by the specified rectangle in the
         * previously prepared pick buffer.The rectangle using top-left coordinate system.
         * @param {Number} x The left edge of the rectangle
         * @param {Number} y The top edge of the rectangle
         * @param {Number} [width] The width of the rectangle
         * @param {Number} [height] The height of the rectangle
         * @returns {pc.MeshInstance[]} An array of mesh instances that are in the selection
         * @example
         * // Get the selection at the point (10,20)
         * var selection = picker.getSelection(10, 20);
         *
         * // Get all models in rectangle with corners at (10,20) and (20,40)
         * var selection = picker.getSelection(10, 20, 10, 20);
         */
        getSelection(x: number, y: number, width?: number, height?: number): pc.MeshInstance[];
        /**
         * @function
         * @name pc.Picker#prepare
         * @description Primes the pick buffer with a rendering of the specified models from the point of view
         * of the supplied camera. Once the pick buffer has been prepared, pc.Picker#getSelection can be
         * called multiple times on the same picker object. Therefore, if the models or camera do not change
         * in any way, pc.Picker#prepare does not need to be called again.
         * @param {pc.CameraComponent} camera The camera component used to render the scene.
         * @param {pc.Scene} scene The scene containing the pickable mesh instances.
         * @param {pc.Layer|pc.RenderTarget} [arg] Layer or RenderTarget from which objects will be picked. If not supplied, all layers rendering to backbuffer before this layer will be used.
         */
        prepare(camera: pc.CameraComponent, scene: pc.Scene, arg?: pc.Layer | pc.RenderTarget): void;
        /**
         * @function
         * @name pc.Picker#resize
         * @description Sets the resolution of the pick buffer. The pick buffer resolution does not need
         * to match the resolution of the corresponding frame buffer use for general rendering of the
         * 3D scene. However, the lower the resolution of the pick buffer, the less accurate the selection
         * results returned by pc.Picker#getSelection. On the other hand, smaller pick buffers will
         * yield greater performance, so there is a trade off.
         * @param {Number} width The width of the pick buffer in pixels.
         * @param {Number} height The height of the pick buffer in pixels.
         */
        resize(width: number, height: number): void;
    }
    /**
     * @function
     * @name pc.calculateNormals
     * @description Generates normal information from the specified positions and triangle indices. See {@link pc.createMesh}.
     * @param {Number[]} positions An array of 3-dimensional vertex positions.
     * @param {Number[]} indices An array of triangle indices.
     * @returns {Number[]} An array of 3-dimensional vertex normals.
     * @example
     * var normals = pc.calculateNormals(positions, indices);
     * var tangents = pc.calculateTangents(positions, normals, uvs, indices);
     * var mesh = pc.createMesh(positions, normals, tangents, uvs, indices);
     */
    function calculateNormals(positions: Number[], indices: Number[]): Number[];
    /**
     * @function
     * @name pc.calculateTangents
     * @description Generates tangent information from the specified positions, normals, texture coordinates
     * and triangle indices. See {@link pc.createMesh}.
     * @param {Number[]} positions An array of 3-dimensional vertex positions.
     * @param {Number[]} normals An array of 3-dimensional vertex normals.
     * @param {Number[]} uvs An array of 2-dimensional vertex texture coordinates.
     * @param {Number[]} indices An array of triangle indices.
     * @returns {Number[]} An array of 3-dimensional vertex tangents.
     * @example
     * var tangents = pc.calculateTangents(positions, normals, uvs, indices);
     * var mesh = pc.createMesh(positions, normals, tangents, uvs, indices);
     */
    function calculateTangents(positions: Number[], normals: Number[], uvs: Number[], indices: Number[]): Number[];
    /**
     * @function
     * @name pc.createMesh
     * @description Creates a new mesh object from the supplied vertex information and topology.
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Number[]} positions An array of 3-dimensional vertex positions.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {Number[]} opts.normals An array of 3-dimensional vertex normals.
     * @param {Number[]} opts.tangents An array of 3-dimensional vertex tangents.
     * @param {Number[]} opts.colors An array of 4-dimensional vertex colors.
     * @param {Number[]} opts.uvs An array of 2-dimensional vertex texture coordinates.
     * @param {Number[]} opts.uvs1 Same as opts.uvs, but for additional UV set
     * @param {Number[]} opts.indices An array of triangle indices.
     * @returns {pc.Mesh} A new Geometry constructed from the supplied vertex and triangle data.
     * @example
     * // Create a new mesh supplying optional parameters using object literal notation
     * var mesh = pc.createMesh(
     *     graphicsDevice,
     *     positions,
     *     {
     *         normals: treeNormals,
     *         uvs: treeUvs,
     *         indices: treeIndices
     *     });
     */
    function createMesh(device: pc.GraphicsDevice, positions: Number[], opts: {
        normals: Number[];
        tangents: Number[];
        colors: Number[];
        uvs: Number[];
        uvs1: Number[];
        indices: Number[];
    }): pc.Mesh;
    /**
     * @function
     * @name pc.createTorus
     * @description Creates a procedural torus-shaped mesh.
     * The size, shape and tesselation properties of the torus can be controlled via function parameters.
     * By default, the function will create a torus in the XZ-plane with a tube radius of 0.2, a ring radius
     * of 0.3, 20 segments and 30 sides.<br />
     * Note that the torus is created with UVs in the range of 0 to 1. Additionally, tangent information
     * is generated into the vertex buffer of the torus's mesh.<br />
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {Number} opts.tubeRadius The radius of the tube forming the body of the torus (defaults to 0.2).
     * @param {Number} opts.ringRadius The radius from the centre of the torus to the centre of the tube (defaults to 0.3).
     * @param {Number} opts.segments The number of radial divisions forming cross-sections of the torus ring (defaults to 20).
     * @param {Number} opts.sides The number of divisions around the tubular body of the torus ring (defaults to 30).
     * @returns {pc.Mesh} A new torus-shaped mesh.
     */
    function createTorus(device: pc.GraphicsDevice, opts: {
        tubeRadius: number;
        ringRadius: number;
        segments: number;
        sides: number;
    }): pc.Mesh;
    /**
     * @function
     * @name pc.createCylinder
     * @description Creates a procedural cylinder-shaped mesh.
     * The size, shape and tesselation properties of the cylinder can be controlled via function parameters.
     * By default, the function will create a cylinder standing vertically centred on the XZ-plane with a radius
     * of 0.5, a height of 1.0, 1 height segment and 20 cap segments.<br />
     * Note that the cylinder is created with UVs in the range of 0 to 1. Additionally, tangent information
     * is generated into the vertex buffer of the cylinder's mesh.<br />
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {Number} opts.radius The radius of the tube forming the body of the cylinder (defaults to 0.5).
     * @param {Number} opts.height The length of the body of the cylinder (defaults to 1.0).
     * @param {Number} opts.heightSegments The number of divisions along the length of the cylinder (defaults to 5).
     * @param {Number} opts.capSegments The number of divisions around the tubular body of the cylinder (defaults to 20).
     * @returns {pc.Mesh} A new cylinder-shaped mesh.
     */
    function createCylinder(device: pc.GraphicsDevice, opts: {
        radius: number;
        height: number;
        heightSegments: number;
        capSegments: number;
    }): pc.Mesh;
    /**
     * @function
     * @name pc.createCapsule
     * @description Creates a procedural capsule-shaped mesh.
     * The size, shape and tesselation properties of the capsule can be controlled via function parameters.
     * By default, the function will create a capsule standing vertically centred on the XZ-plane with a radius
     * of 0.25, a height of 1.0, 1 height segment and 10 cap segments.<br />
     * Note that the capsule is created with UVs in the range of 0 to 1. Additionally, tangent information
     * is generated into the vertex buffer of the capsule's mesh.<br />
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {Number} opts.radius The radius of the tube forming the body of the capsule (defaults to 0.3).
     * @param {Number} opts.height The length of the body of the capsule from tip to tip (defaults to 1.0).
     * @param {Number} opts.heightSegments The number of divisions along the tubular length of the capsule (defaults to 1).
     * @param {Number} opts.sides The number of divisions around the tubular body of the capsule (defaults to 20).
     * @returns {pc.Mesh} A new cylinder-shaped mesh.
     */
    function createCapsule(device: pc.GraphicsDevice, opts: {
        radius: number;
        height: number;
        heightSegments: number;
        sides: number;
    }): pc.Mesh;
    /**
     * @function
     * @name pc.createCone
     * @description Creates a procedural cone-shaped mesh.</p>
     * The size, shape and tesselation properties of the cone can be controlled via function parameters.
     * By default, the function will create a cone standing vertically centred on the XZ-plane with a base radius
     * of 0.5, a height of 1.0, 5 height segments and 20 cap segments.<br />
     * Note that the cone is created with UVs in the range of 0 to 1. Additionally, tangent information
     * is generated into the vertex buffer of the cone's mesh.<br />
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {Number} opts.baseRadius The base radius of the cone (defaults to 0.5).
     * @param {Number} opts.peakRadius The peak radius of the cone (defaults to 0.0).
     * @param {Number} opts.height The length of the body of the cone (defaults to 1.0).
     * @param {Number} opts.heightSegments The number of divisions along the length of the cone (defaults to 5).
     * @param {Number} opts.capSegments The number of divisions around the tubular body of the cone (defaults to 18).
     * @returns {pc.Mesh} A new cone-shaped mesh.
     */
    function createCone(device: pc.GraphicsDevice, opts: {
        baseRadius: number;
        peakRadius: number;
        height: number;
        heightSegments: number;
        capSegments: number;
    }): pc.Mesh;
    /**
     * @function
     * @name pc.createSphere
     * @description Creates a procedural sphere-shaped mesh.
     * The size and tesselation properties of the sphere can be controlled via function parameters. By
     * default, the function will create a sphere centred on the object space origin with a radius of 0.5
     * and 16 segments in both longitude and latitude.<br />
     * Note that the sphere is created with UVs in the range of 0 to 1. Additionally, tangent information
     * is generated into the vertex buffer of the sphere's mesh.<br />
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {Number} opts.radius The radius of the sphere (defaults to 0.5).
     * @param {Number} opts.segments The number of divisions along the longitudinal and latitudinal axes of the sphere (defaults to 16).
     * @returns {pc.Mesh} A new sphere-shaped mesh.
     */
    function createSphere(device: pc.GraphicsDevice, opts: {
        radius: number;
        segments: number;
    }): pc.Mesh;
    /**
     * @function
     * @name pc.createPlane
     * @description Creates a procedural plane-shaped mesh.
     * The size and tesselation properties of the plane can be controlled via function parameters. By
     * default, the function will create a plane centred on the object space origin with a width and
     * length of 1.0 and 5 segments in either axis (50 triangles). The normal vector of the plane is aligned
     * along the positive Y axis.<br />
     * Note that the plane is created with UVs in the range of 0 to 1. Additionally, tangent information
     * is generated into the vertex buffer of the plane's mesh.<br />
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {pc.Vec2} opts.halfExtents The half dimensions of the plane in the X and Z axes (defaults to [0.5, 0.5]).
     * @param {Number} opts.widthSegments The number of divisions along the X axis of the plane (defaults to 5).
     * @param {Number} opts.lengthSegments The number of divisions along the Z axis of the plane (defaults to 5).
     * @returns {pc.Mesh} A new plane-shaped mesh.
     */
    function createPlane(device: pc.GraphicsDevice, opts: {
        halfExtents: pc.Vec2;
        widthSegments: number;
        lengthSegments: number;
    }): pc.Mesh;
    /**
     * @function
     * @name pc.createBox
     * @description Creates a procedural box-shaped mesh.
     * The size, shape and tesselation properties of the box can be controlled via function parameters. By
     * default, the function will create a box centred on the object space origin with a width, length and
     * height of 1.0 unit and 10 segments in either axis (50 triangles per face).<br />
     * Note that the box is created with UVs in the range of 0 to 1 on each face. Additionally, tangent
     * information is generated into the vertex buffer of the box's mesh.<br />
     * @param {pc.GraphicsDevice} device The graphics device used to manage the mesh.
     * @param {Object} opts An object that specifies optional inputs for the function as follows:
     * @param {pc.Vec3} opts.halfExtents The half dimensions of the box in each axis (defaults to [0.5, 0.5, 0.5]).
     * @param {Number} opts.widthSegments The number of divisions along the X axis of the box (defaults to 1).
     * @param {Number} opts.lengthSegments The number of divisions along the Z axis of the box (defaults to 1).
     * @param {Number} opts.heightSegments The number of divisions along the Y axis of the box (defaults to 1).
     * @returns {pc.Mesh} A new box-shaped mesh.
     */
    function createBox(device: pc.GraphicsDevice, opts: {
        halfExtents: pc.Vec3;
        widthSegments: number;
        lengthSegments: number;
        heightSegments: number;
    }): pc.Mesh;
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_SUBTRACTIVE
     * @description Subtract the color of the source fragment from the destination fragment
     * and write the result to the frame buffer.
     */
    enum BLEND_SUBTRACTIVE {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_ADDITIVE
     * @description Add the color of the source fragment to the destination fragment
     * and write the result to the frame buffer.
     */
    enum BLEND_ADDITIVE {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_NORMAL
     * @description Enable simple translucency for materials such as glass. This is
     * equivalent to enabling a source blend mode of pc.BLENDMODE_SRC_ALPHA and a destination
     * blend mode of pc.BLENDMODE_ONE_MINUS_SRC_ALPHA.
     */
    enum BLEND_NORMAL {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_NONE
     * @description Disable blending.
     */
    enum BLEND_NONE {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_PREMULTIPLIED
     * @description Similar to pc.BLEND_NORMAL expect the source fragment is assumed to have
     * already been multiplied by the source alpha value.
     */
    enum BLEND_PREMULTIPLIED {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_MULTIPLICATIVE
     * @description Multiply the color of the source fragment by the color of the destination
     * fragment and write the result to the frame buffer.
     */
    enum BLEND_MULTIPLICATIVE {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_ADDITIVEALPHA
     * @description Same as pc.BLEND_ADDITIVE except the source RGB is multiplied by the source alpha.
     */
    enum BLEND_ADDITIVEALPHA {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_MULTIPLICATIVE2X
     * @description Multiplies colors and doubles the result
     */
    enum BLEND_MULTIPLICATIVE2X {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_SCREEN
     * @description Softer version of additive
     */
    enum BLEND_SCREEN {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_MIN
     * @description Minimum color. Check app.graphicsDevice.extBlendMinmax for support.
     */
    enum BLEND_MIN {
    }
    /**
     * @enum pc.BLEND
     * @name pc.BLEND_MAX
     * @description Maximum color. Check app.graphicsDevice.extBlendMinmax for support.
     */
    enum BLEND_MAX {
    }
    /**
     * @enum pc.FOG
     * @name pc.FOG_NONE
     * @description No fog is applied to the scene.
     */
    enum FOG_NONE {
    }
    /**
     * @enum pc.FOG
     * @name pc.FOG_LINEAR
     * @description Fog rises linearly from zero to 1 between a start and end depth.
     */
    enum FOG_LINEAR {
    }
    /**
     * @enum pc.FOG
     * @name pc.FOG_EXP
     * @description Fog rises according to an exponential curve controlled by a density value.
     */
    enum FOG_EXP {
    }
    /**
     * @enum pc.FOG
     * @name pc.FOG_EXP2
     * @description Fog rises according to an exponential curve controlled by a density value.
     */
    enum FOG_EXP2 {
    }
    /**
     * @enum pc.LAYERID
     * @name pc.LAYERID_WORLD
     * @description The world layer.
     */
    enum LAYERID_WORLD {
    }
    /**
     * @enum pc.LAYERID
     * @name pc.LAYERID_DEPTH
     * @description The depth layer.
     */
    enum LAYERID_DEPTH {
    }
    /**
     * @enum pc.LAYERID
     * @name pc.LAYERID_SKYBOX
     * @description The skybox layer.
     */
    enum LAYERID_SKYBOX {
    }
    /**
     * @enum pc.LAYERID
     * @name pc.LAYERID_IMMEDIATE
     * @description The immediate layer.
     */
    enum LAYERID_IMMEDIATE {
    }
    /**
     * @enum pc.LAYERID
     * @name pc.LAYERID_UI
     * @description The UI layer.
     */
    enum LAYERID_UI {
    }
    /**
     * @enum pc.LIGHTTYPE
     * @name pc.LIGHTTYPE_DIRECTIONAL
     * @description Directional (global) light source.
     */
    enum LIGHTTYPE_DIRECTIONAL {
    }
    /**
     * @enum pc.LIGHTTYPE
     * @name pc.LIGHTTYPE_POINT
     * @description Point (local) light source.
     */
    enum LIGHTTYPE_POINT {
    }
    /**
     * @enum pc.LIGHTTYPE
     * @name pc.LIGHTTYPE_SPOT
     * @description Spot (local) light source.
     */
    enum LIGHTTYPE_SPOT {
    }
    /**
     * @enum pc.PROJECTION
     * @name pc.PROJECTION_PERSPECTIVE
     * @description A perspective camera projection where the frustum shape is essentially pyramidal.
     */
    enum PROJECTION_PERSPECTIVE {
    }
    /**
     * @enum pc.PROJECTION
     * @name pc.PROJECTION_ORTHOGRAPHIC
     * @description An orthographic camera projection where the frustum shape is essentially a cuboid.
     */
    enum PROJECTION_ORTHOGRAPHIC {
    }
    /**
     * @enum pc.SHADER
     * @name pc.SHADER_FORWARD
     * @description Render shaded materials with gamma correction and tonemapping.
     */
    enum SHADER_FORWARD {
    }
    /**
     * @enum pc.SHADER
     * @name pc.SHADER_FORWARD
     * @description Render shaded materials with gamma correction and tonemapping.
     */
    enum SHADER_FORWARD {
    }
    /**
     * @enum pc.SHADER
     * @name pc.SHADER_FORWARD
     * @description Render shaded materials with gamma correction and tonemapping.
     */
    enum SHADER_FORWARD {
    }
    /**
     * @enum pc.SORTMODE
     * @name pc.SORTMODE_NONE
     * @description No sorting is applied. Mesh instances are rendered in the same order they were added to a layer.
     */
    enum SORTMODE_NONE {
    }
    /**
     * @enum pc.SORTMODE
     * @name pc.SORTMODE_MANUAL
     * @description Mesh instances are sorted based on {@link pc.MeshInstance#drawOrder}.
     */
    enum SORTMODE_MANUAL {
    }
    /**
     * @enum pc.SORTMODE
     * @name pc.SORTMODE_MATERIALMESH
     * @description Mesh instances are sorted to minimize switching between materials and meshes to improve rendering performance.
     */
    enum SORTMODE_MATERIALMESH {
    }
    /**
     * @enum pc.SORTMODE
     * @name pc.SORTMODE_BACK2FRONT
     * @description Mesh instances are sorted back to front. This is the way to properly render many semi-transparent objects on different depth, one is blended on top of another.
     */
    enum SORTMODE_BACK2FRONT {
    }
    /**
     * @enum pc.SORTMODE
     * @name pc.SORTMODE_FRONT2BACK
     * @description Mesh instances are sorted front to back. Depending on GPU and the scene, this option may give better performance than pc.SORTMODE_MATERIALMESH due to reduced overdraw.
     */
    enum SORTMODE_FRONT2BACK {
    }
    /**
     * @enum pc.ORIENTATION
     * @name pc.ORIENTATION_HORIZONTAL
     * @description Horizontal orientation.
     */
    enum ORIENTATION_HORIZONTAL {
    }
    /**
     * @enum pc.ORIENTATION
     * @name pc.ORIENTATION_VERTICAL
     * @description Vertical orientation.
     */
    enum ORIENTATION_VERTICAL {
    }
    /**
     * @constructor
     * @name pc.Scene
     * @classdesc A scene is graphical representation of an environment. It manages the scene hierarchy, all
     * graphical objects, lights, and scene-wide properties.
     * @description Creates a new Scene.
     * @property {pc.Color} ambientLight The color of the scene's ambient light. Defaults to black (0, 0, 0).
     * @property {String} fog The type of fog used by the scene. Can be:
     * <ul>
     *     <li>pc.FOG_NONE</li>
     *     <li>pc.FOG_LINEAR</li>
     *     <li>pc.FOG_EXP</li>
     *     <li>pc.FOG_EXP2</li>
     * </ul>
     * Defaults to pc.FOG_NONE.
     * @property {pc.Color} fogColor The color of the fog (if enabled). Defaults to black (0, 0, 0).
     * @property {Number} fogDensity The density of the fog (if enabled). This property is only valid if the
     * fog property is set to pc.FOG_EXP or pc.FOG_EXP2. Defaults to 0.
     * @property {Number} fogEnd The distance from the viewpoint where linear fog reaches its maximum. This
     * property is only valid if the fog property is set to pc.FOG_LINEAR. Defaults to 1000.
     * @property {Number} fogStart The distance from the viewpoint where linear fog begins. This property is
     * only valid if the fog property is set to pc.FOG_LINEAR. Defaults to 1.
     * @property {Number} gammaCorrection The gamma correction to apply when rendering the scene. Can be:
     * <ul>
     *     <li>pc.GAMMA_NONE</li>
     *     <li>pc.GAMMA_SRGB</li>
     * </ul>
     * Defaults to pc.GAMMA_NONE.
     * @property {Number} toneMapping The tonemapping transform to apply when writing fragments to the
     * frame buffer. Can be:
     * <ul>
     *     <li>pc.TONEMAP_LINEAR</li>
     *     <li>pc.TONEMAP_FILMIC</li>
     *     <li>pc.TONEMAP_HEJL</li>
     *     <li>pc.TONEMAP_ACES</li>
     * </ul>
     * Defaults to pc.TONEMAP_LINEAR.
     * @property {pc.Texture} skybox A cube map texture used as the scene's skybox. Defaults to null.
     * @property {Number} skyboxIntensity Multiplier for skybox intensity. Defaults to 1.
     * @property {Number} skyboxMip The mip level of the skybox to be displayed. Only valid for prefiltered
     * cubemap skyboxes. Defaults to 0 (base level).
     * @property {Number} lightmapSizeMultiplier The lightmap resolution multiplier. Defaults to 1.
     * @property {Number} lightmapMaxResolution The maximum lightmap resolution. Defaults to 2048.
     * @property {Number} lightmapMode The lightmap baking mode. Can be:
     * <ul>
     *     <li>pc.BAKE_COLOR: single color lightmap
     *     <li>pc.BAKE_COLORDIR: single color lightmap + dominant light direction (used for bump/specular)
     * </ul>
     * Only lights with bakeDir=true will be used for generating the dominant light direction. Defaults to
     * pc.BAKE_COLORDIR.
     * @property {pc.LayerComposition} layers A {@link pc.LayerComposition} that defines rendering order of this scene.
     */
    class Scene {
    }
    /**
     * @constructor
     * @name pc.Skin
     * @classdesc A skin contains data about the bones in a hierarchy that drive a skinned mesh animation.
     * Specifically, the skin stores the bone name and inverse bind matrix and for each bone.
     * Inverse bind matrices are instrumental in the mathematics of vertex skinning.
     * @param {pc.GraphicsDevice} graphicsDevice The graphics device used to manage this skin.
     * @param {pc.Mat4[]} ibp The array of inverse bind matrices.
     * @param {String[]} boneNames The array of bone names for the bones referenced by this skin.
     */
    class Skin {
        constructor(graphicsDevice: pc.GraphicsDevice, ibp: pc.Mat4[], boneNames: String[]);
    }
    /**
     * @constructor
     * @name pc.SkinInstance
     * @classdesc A skin instance is responsible for generating the matrix palette that is used to
     * skin vertices from object space to world space.
     * @param {pc.Skin} skin The skin that will provide the inverse bind pose matrices to
     * generate the final matrix palette.
     */
    class SkinInstance {
        constructor(skin: pc.Skin);
    }
    /**
     * @enum pc.SPRITE_RENDERMODE
     * @name pc.SPRITE_RENDERMODE_SIMPLE
     * @description This mode renders a sprite as a simple quad.
     */
    enum SPRITE_RENDERMODE_SIMPLE {
    }
    /**
     * @enum pc.SPRITE_RENDERMODE
     * @name pc.SPRITE_RENDERMODE_SLICED
     * @description This mode renders a sprite using 9-slicing in 'sliced' mode. Sliced mode stretches the
     * top and bottom regions of the sprite horizontally, the left and right regions vertically and the middle region
     * both horizontally and vertically.
     */
    enum SPRITE_RENDERMODE_SLICED {
    }
    /**
     * @enum pc.SPRITE_RENDERMODE
     * @name pc.SPRITE_RENDERMODE_TILED
     * @description This mode renders a sprite using 9-slicing in 'tiled' mode. Tiled mode tiles the
     * top and bottom regions of the sprite horizontally, the left and right regions vertically and the middle region
     * both horizontally and vertically.
     */
    enum SPRITE_RENDERMODE_TILED {
    }
    /**
     * @constructor
     * @name pc.Sprite
     * @classdesc A pc.Sprite is contains references to one or more frames of a {@link pc.TextureAtlas}. It can be used
     * by the {@link pc.SpriteComponent} or the {@link pc.ElementComponent} to render a single frame or a sprite animation.
     * @param {pc.GraphicsDevice} device The graphics device of the application.
     * @param {Object} options Options for creating the pc.Sprite.
     * @param {Number} [options.pixelsPerUnit] The number of pixels that map to one PlayCanvas unit.
     * @param {Number} [options.renderMode] The rendering mode of the Sprite, see {@link pc.SPRITE_RENDERMODE}.
     * @param {pc.TextureAtlas} [options.atlas] The texture atlas.
     * @property {String[]} [options.frameKeys] The keys of the frames in the sprite atlas that this sprite is using.
     * @property {Number} pixelsPerUnit The number of pixels that map to one PlayCanvas unit.
     * @property {pc.TextureAtlas} atlas The texture atlas.
     * @property {Number} renderMode The rendering mode of the Sprite, see {@link pc.SPRITE_RENDERMODE}.
     * @property {String[]} frameKeys The keys of the frames in the sprite atlas that this sprite is using.
     * @property {pc.Mesh[]} meshes An array that contains a mesh for each frame.
     */
    class Sprite {
        constructor(device: pc.GraphicsDevice, options: {
            pixelsPerUnit?: number;
            renderMode?: number;
            atlas?: pc.TextureAtlas;
        });
        /**
         * @function
         * @name pc.Sprite#destroy
         * @description Free up the meshes created by the sprite.
         */
        destroy(): void;
    }
    /**
     * @constructor
     * @name pc.StencilParameters
     * @classdesc Holds stencil test settings
     * @description Create a new StencilParameters instance
     * @param {Object} options Options object to configure the stencil parameters.
     * @property {Number} func Sets stencil test function. See {@link pc.GraphicsDevice#setStencilFunc}
     * @property {Number} ref Sets stencil test reference value. See {@link pc.GraphicsDevice#setStencilFunc}
     * @property {Number} fail Sets operation to perform if stencil test is failed. See {@link pc.GraphicsDevice#setStencilOperation}
     * @property {Number} zfail Sets operation to perform if depth test is failed. See {@link pc.GraphicsDevice#setStencilOperation}
     * @property {Number} zpass Sets operation to perform if both stencil and depth test are passed. See {@link pc.GraphicsDevice#setStencilOperation}
     * @property {Number} readMask Sets stencil test reading mask. See {@link pc.GraphicsDevice#setStencilFunc}
     * @property {Number} writeMask Sets stencil test writing mask. See {@link pc.GraphicsDevice#setStencilOperation}
     */
    class StencilParameters {
        constructor(options: any);
    }
    /**
     * @constructor
     * @name pc.TextureAtlas
     * @classdesc A pc.TextureAtlas contains a number of frames from a texture. Each frame defines a region in
     * a texture. The pc.TextureAtlas is referenced by {@link pc.Sprite}s.
     * @property {pc.Texture} texture The texture atlas.
     * @property {Object} frames Contains frames which define portions of the texture atlas.
     * @example
     * var atlas = new pc.TextureAtlas();
     * atlas.frames = {
     *   '0': {
     *       // rect has u, v, width and height in pixels
     *       rect: new pc.Vec4(0, 0, 256, 256),
     *       // pivot has x, y values between 0-1 which define the point
     *       // within the frame around which rotation and scale is calculated
     *       pivot: new pc.Vec2(0.5, 0.5),
     * .      // border has left, bottom, right and top in pixels defining regions for 9-slicing
     * .      border: new pc.Vec4(5, 5, 5, 5)
     *   },
     *   '1': {
     *       rect: new pc.Vec4(256, 0, 256, 256),
     *       pivot: new pc.Vec2(0.5, 0.5),
     *       border: new pc.Vec4(5, 5, 5, 5)
     *   },
     *   ...
     * };
     */
    class TextureAtlas {
        /**
         * @function
         * @name pc.TextureAtlas#setFrame
         * @param {String} key The key of the frame.
         * @param {Object} data The properties of the frame.
         * @param {pc.Vec4} [data.rect] The u, v, width, height properties of the frame in pixels.
         * @param {pc.Vec2} [data.pivot] The pivot of the frame - values are between 0-1.
         * @param {pc.Vec4} [data.border] The border of the frame for 9-slicing. Values are left, bottom, right, top border in pixels.
         * @example
         * atlas.setFrame('1', {
         *    rect: new pc.Vec4(0,0,128,128),
         *    pivot: new pc.Vec2(0.5, 0.5),
         *    border: new pc.Vec4(5, 5, 5, 5)
         * });
         */
        setFrame(key: string, data: {
            rect?: pc.Vec4;
            pivot?: pc.Vec2;
            border?: pc.Vec4;
        }): void;
        /**
         * @function
         * @name pc.TextureAtlas#removeFrame
         * @param {String} key The key of the frame.
         * @example
         * atlas.removeFrame('1');
         */
        removeFrame(key: string): void;
        /**
         * @function
         * @name pc.TextureAtlas#destroy
         * @description Free up the underlying WebGL resource owned by the texture.
         */
        destroy(): void;
    }
    /**
     * @constructor
     * @name pc.ScriptRegistry
     * @classdesc Container for all Script Types that are available to this application
     * @description Create an instance of a pc.ScriptRegistry.
     * Note: PlayCanvas scripts can access the Script Registry from inside the application with {@link pc.Application#scripts} {@link pc.ADDRESS_REPEAT}.
     * @param {pc.Application} app Application to attach registry to.
     */
    class ScriptRegistry {
        constructor(app: pc.Application);
        /**
         * @function
         * @name pc.ScriptRegistry#add
         * @description Add {@link ScriptType} to registry.
         * Note: when {@link pc.createScript} is called, it will add the {@link ScriptType} to the registry automatically.
         * If a script already exists in registry, and the new script has a `swap` method defined,
         * it will perform code hot swapping automatically in async manner.
         * @param {ScriptType} script Script Type that is created using {@link pc.createScript}
         * @returns {Boolean} True if added for the first time or false if script already exists
         * @example
         * var PlayerController = pc.createScript('playerController');
         * // playerController Script Type will be added to pc.ScriptRegistry automatically
         * app.scripts.has('playerController') === true; // true
         */
        add(script: ScriptType): boolean;
        /**
         * @function
         * @name pc.ScriptRegistry#remove
         * @description Remove {@link ScriptType}.
         * @param {String} name Name of a {@link ScriptType} to remove
         * @returns {Boolean} True if removed or False if already not in registry
         * @example
         * app.scripts.remove('playerController');
         */
        remove(name: string): boolean;
        /**
         * @function
         * @name pc.ScriptRegistry#get
         * @description Get {@link ScriptType} by name.
         * @param {String} name Name of a {@link ScriptType}.
         * @returns {ScriptType} The Script Type if it exists in the registry or null otherwise.
         * @example
         * var PlayerController = app.scripts.get('playerController');
         */
        get(name: string): ScriptType;
        /**
         * @function
         * @name pc.ScriptRegistry#has
         * @description Check if a {@link ScriptType} with the specified name is in the registry.
         * @param {String} name Name of a {@link ScriptType}
         * @returns {Boolean} True if {@link ScriptType} is in registry
         * @example
         * if (app.scripts.has('playerController')) {
         *     // playerController is in pc.ScriptRegistry
         * }
         */
        has(name: string): boolean;
        /**
         * @function
         * @name pc.ScriptRegistry#list
         * @description Get list of all {@link ScriptType}s from registry.
         * @returns {ScriptType[]} list of all {@link ScriptType}s in registry
         * @example
         * // logs array of all Script Type names available in registry
         * console.log(app.scripts.list().map(function(o) {
         *     return o.name;
         * }));
         */
        list(): ScriptType[];
    }
    /**
     * @constructor
     * @name pc.ScriptAttributes
     * @classdesc Container of Script Attribute definitions. Implements an interface to add/remove attributes and store their definition for a {@link ScriptType}.
     * Note: An instance of pc.ScriptAttributes is created automatically by each {@link ScriptType}.
     * @param {ScriptType} scriptType Script Type that attributes relate to.
     */
    class ScriptAttributes {
        constructor(scriptType: ScriptType);
        /**
         * @function
         * @name pc.ScriptAttributes#add
         * @description Add Attribute
         * @param {String} name Name of an attribute
         * @param {Object} args Object with Arguments for an attribute
         * @param {String} args.type Type of an attribute value, list of possible types:
         * boolean, number, string, json, asset, entity, rgb, rgba, vec2, vec3, vec4, curve
         * @param {*} [args.default] Default attribute value
         * @param {String} [args.title] Title for Editor's for field UI
         * @param {String} [args.description] Description for Editor's for field UI
         * @param {String|String[]} [args.placeholder] Placeholder for Editor's for field UI.
         * For multi-field types, such as vec2, vec3, and others use array of strings.
         * @param {Boolean} [args.array] If attribute can hold single or multiple values
         * @param {Number} [args.size] If attribute is array, maximum number of values can be set
         * @param {Number} [args.min] Minimum value for type 'number', if max and min defined, slider will be rendered in Editor's UI
         * @param {Number} [args.max] Maximum value for type 'number', if max and min defined, slider will be rendered in Editor's UI
         * @param {Number} [args.precision] Level of precision for field type 'number' with floating values
         * @param {Number} [args.step] Step value for type 'number'. The amount used to increment the value when using the arrow keys in the Editor's UI.
         * @param {String} [args.assetType] Name of asset type to be used in 'asset' type attribute picker in Editor's UI, defaults to '*' (all)
         * @param {String[]} [args.curves] List of names for Curves for field type 'curve'
         * @param {String} [args.color] String of color channels for Curves for field type 'curve', can be any combination of `rgba` characters.
         * Defining this property will render Gradient in Editor's field UI
         * @param {Object[]} [args.enum] List of fixed choices for field, defined as array of objects, where key in object is a title of an option
         * @example
         * PlayerController.attributes.add('fullName', {
         *     type: 'string',
         * });
         * @example
         * PlayerController.attributes.add('speed', {
         *     type: 'number',
         *     title: 'Speed',
         *     placeholder: 'km/h',
         *     default: 22.2
         * });
         * @example
         * PlayerController.attributes.add('resolution', {
         *     type: 'number',
         *     default: 32,
         *     enum: [
         *        { '32x32': 32 },
         *        { '64x64': 64 },
         *        { '128x128': 128 }
         *     ]
         * });
         */
        add(name: string, args: {
            type: string;
            default?: any;
            title?: string;
            description?: string;
            placeholder?: string | String[];
            array?: boolean;
            size?: number;
            min?: number;
            max?: number;
            precision?: number;
            step?: number;
            assetType?: string;
            curves?: String[];
            color?: string;
            enum?: object[];
        }): void;
        /**
         * @function
         * @name pc.ScriptAttributes#remove
         * @description Remove Attribute.
         * @param {String} name Name of an attribute
         * @returns {Boolean} True if removed or false if not defined
         * @example
         * PlayerController.attributes.remove('fullName');
         */
        remove(name: string): boolean;
        /**
         * @function
         * @name pc.ScriptAttributes#has
         * @description Detect if Attribute is added.
         * @param {String} name Name of an attribute
         * @returns {Boolean} True if Attribute is defined
         * @example
         * if (PlayerController.attributes.has('fullName')) {
         *     // attribute `fullName` is defined
         * });
         */
        has(name: string): boolean;
        /**
         * @function
         * @name pc.ScriptAttributes#get
         * @description Get object with attribute arguments.
         * Note: Changing argument properties will not affect existing Script Instances.
         * @param {String} name Name of an attribute
         * @returns {?Object} Arguments with attribute properties
         * @example
         * // changing default value for an attribute 'fullName'
         * var attr = PlayerController.attributes.get('fullName');
         * if (attr) attr.default = 'Unknown';
         */
        get(name: string): any;
    }
    /**
     * @static
     * @function
     * @name pc.createScript
     * @description Method to create named {@link ScriptType}.
     * It returns new function (class) "Script Type", which is auto-registered to {@link pc.ScriptRegistry} using it's name.
     * This is the main interface to create Script Types, to define custom logic using JavaScript, that is used to create interaction for entities.
     * @param {String} name unique Name of a Script Type.
     * If a Script Type with the same name has already been registered and the new one has a `swap` method defined in its prototype,
     * then it will perform hot swapping of existing Script Instances on entities using this new Script Type.
     * Note: There is a reserved list of names that cannot be used, such as list below as well as some starting from `_` (underscore):
     * system, entity, create, destroy, swap, move, scripts, onEnable, onDisable, onPostStateChange, has, on, off, fire, once, hasEvent
     * @param {pc.Application} [app] Optional application handler, to choose which {@link pc.ScriptRegistry} to add a script to.
     * By default it will use `pc.Application.getApplication()` to get current {@link pc.Application}.
     * @returns {Function} The constructor of a {@link ScriptType}, which the developer is meant to extend by adding attributes and prototype methods.
     * @example
     * var Turning = pc.createScript('turn');
     *
     * // define `speed` attribute that is available in Editor UI
     * Turning.attributes.add('speed', {
     *     type: 'number',
     *     default: 180,
     *     placeholder: 'deg/s'
     * });
     *
     * // runs every tick
     * Turning.prototype.update = function(dt) {
     *     this.entity.rotate(0, this.speed * dt, 0);
     * };
     */
    function createScript(name: string, app?: pc.Application): (...params: any[]) => any;
    /**
     * @constructor
     * @name pc.BoundingBox
     * @description Create a new axis-aligned bounding box.
     * @classdesc Axis-Aligned Bounding Box.
     * @param {pc.Vec3} [center] Center of box. The constructor takes a reference of this parameter.
     * @param {pc.Vec3} [halfExtents] Half the distance across the box in each axis. The constructor takes a reference of this parameter.
     */
    class BoundingBox {
        constructor(center?: pc.Vec3, halfExtents?: pc.Vec3);
        /**
         * @function
         * @name pc.BoundingBox#add
         * @description Combines two bounding boxes into one, enclosing both.
         * @param {pc.BoundingBox} other Bounding box to add.
         */
        add(other: pc.BoundingBox): void;
        /**
         * @function
         * @name pc.BoundingBox#intersects
         * @description Test whether two axis-aligned bounding boxes intersect.
         * @param {pc.BoundingBox} other Bounding box to test against.
         * @returns {Boolean} True if there is an intersection.
         */
        intersects(other: pc.BoundingBox): boolean;
        /**
         * @function
         * @name pc.BoundingBox#intersectsRay
         * @description Test if a ray intersects with the AABB.
         * @param {pc.Ray} ray Ray to test against (direction must be normalized).
         * @param {pc.Vec3} [point] If there is an intersection, the intersection point will be copied into here.
         * @returns {Boolean} True if there is an intersection.
         */
        intersectsRay(ray: pc.Ray, point?: pc.Vec3): boolean;
        /**
         * @function
         * @name pc.BoundingBox#getMin
         * @description Return the minimum corner of the AABB.
         * @returns {pc.Vec3} minimum corner.
         */
        getMin(): pc.Vec3;
        /**
         * @function
         * @name pc.BoundingBox#getMax
         * @description Return the maximum corner of the AABB.
         * @returns {pc.Vec3} maximum corner.
         */
        getMax(): pc.Vec3;
        /**
         * @function
         * @name pc.BoundingBox#containsPoint
         * @description Test if a point is inside a AABB.
         * @param {pc.Vec3} point Point to test.
         * @returns {Boolean} true if the point is inside the AABB and false otherwise.
         */
        containsPoint(point: pc.Vec3): boolean;
        /**
         * @function
         * @name pc.BoundingBox#setFromTransformedAabb
         * @description Set an AABB to enclose the specified AABB if it were to be
         * transformed by the specified 4x4 matrix.
         * @param {pc.BoundingBox} aabb Box to transform and enclose
         * @param {pc.Mat4} m Transformation matrix to apply to source AABB.
         */
        setFromTransformedAabb(aabb: pc.BoundingBox, m: pc.Mat4): void;
        /**
         * @function
         * @name pc.BoundingBox#intersectsBoundingSphere
         * @description Test if a Bounding Sphere is overlapping, enveloping, or inside this AABB.
         * @param {pc.BoundingSphere} sphere Bounding Sphere to test.
         * @returns {Boolean} true if the Bounding Sphere is overlapping, enveloping, or inside the AABB and false otherwise.
         */
        intersectsBoundingSphere(sphere: pc.BoundingSphere): boolean;
    }
    /**
     * @constructor
     * @name pc.BoundingSphere
     * @classdesc A bounding sphere is a volume for facilitating fast intersection testing.
     * @description Creates a new bounding sphere.
     * @example
     * // Create a new bounding sphere centered on the origin with a radius of 0.5
     * var sphere = new pc.BoundingSphere();
     * @param {pc.Vec3} [center] The world space coordinate marking the center of the sphere. The constructor takes a reference of this parameter.
     * @param {Number} [radius] The radius of the bounding sphere. Defaults to 0.5.
     */
    class BoundingSphere {
        constructor(center?: pc.Vec3, radius?: number);
        /**
         * @function
         * @name pc.BoundingSphere#intersectsRay
         * @description Test if a ray intersects with the sphere.
         * @param {pc.Ray} ray Ray to test against (direction must be normalized).
         * @param {pc.Vec3} [point] If there is an intersection, the intersection point will be copied into here.
         * @returns {Boolean} True if there is an intersection.
         */
        intersectsRay(ray: pc.Ray, point?: pc.Vec3): boolean;
        /**
         * @function
         * @name pc.BoundingSphere#intersectsBoundingSphere
         * @description Test if a Bounding Sphere is overlapping, enveloping, or inside this Bounding Sphere.
         * @param {pc.BoundingSphere} sphere Bounding Sphere to test.
         * @returns {Boolean} true if the Bounding Sphere is overlapping, enveloping, or inside this Bounding Sphere and false otherwise.
         */
        intersectsBoundingSphere(sphere: pc.BoundingSphere): boolean;
    }
    /**
     * @constructor
     * @name pc.Frustum
     * @classdesc A frustum is a shape that defines the viewing space of a camera.
     * @description Creates a new frustum shape.
     * @example
     * // Create a new frustum equivalent to one held by a camera component
     * var projectionMatrix = entity.camera.projectionMatrix;
     * var viewMatrix = entity.camera.viewMatrix;
     * var frustum = new pc.Frustum(projectionMatrix, viewMatrix);
     * @param {pc.Mat4} projectionMatrix The projection matrix describing the shape of the frustum.
     * @param {pc.Mat4} viewMatrix The inverse of the world transformation matrix for the frustum.
     */
    class Frustum {
        constructor(projectionMatrix: pc.Mat4, viewMatrix: pc.Mat4);
        /**
         * @function
         * @name pc.Frustum#update
         * @description Updates the frustum shape based on a view matrix and a projection matrix.
         * @param {pc.Mat4} projectionMatrix The projection matrix describing the shape of the frustum.
         * @param {pc.Mat4} viewMatrix The inverse of the world transformation matrix for the frustum.
         */
        update(projectionMatrix: pc.Mat4, viewMatrix: pc.Mat4): void;
        /**
         * @function
         * @name pc.Frustum#containsPoint
         * @description Tests whether a point is inside the frustum. Note that points lying in a frustum plane are
         * considered to be outside the frustum.
         * @param {pc.Vec3} point The point to test
         * @returns {Boolean} true if the point is inside the frustum, false otherwise
         */
        containsPoint(point: pc.Vec3): boolean;
        /**
         * @function
         * @name pc.Frustum#containsSphere
         * @description Tests whether a bounding sphere intersects the frustum. If the sphere is outside the frustum,
         * zero is returned. If the sphere intersects the frustum, 1 is returned. If the sphere is completely inside
         * the frustum, 2 is returned. Note that a sphere touching a frustum plane from the outside is considered to
         * be outside the frustum.
         * @param {pc.BoundingSphere} sphere The sphere to test
         * @returns {Number} 0 if the bounding sphere is outside the frustum, 1 if it intersects the frustum and 2 if
         * it is contained by the frustum
         */
        containsSphere(sphere: pc.BoundingSphere): number;
    }
    /**
     * @constructor
     * @name pc.OrientedBox
     * @description Create a new oriented box.
     * @classdesc Oriented Box.
     * @property {pc.Mat4} [worldTransform] The world transform of the OBB
     * @param {pc.Mat4} [worldTransform] Transform that has the orientation and position of the box. Scale is assumed to be one.
     * @param {pc.Vec3} [halfExtents] Half the distance across the box in each local axis. The constructor takes a reference of this parameter.
     */
    class OrientedBox {
        constructor(worldTransform?: pc.Mat4, halfExtents?: pc.Vec3);
        /**
         * @function
         * @name pc.OrientedBox#intersectsRay
         * @description Test if a ray intersects with the OBB.
         * @param {pc.Ray} ray Ray to test against (direction must be normalized).
         * @param {pc.Vec3} [point] If there is an intersection, the intersection point will be copied into here.
         * @returns {Boolean} True if there is an intersection.
         */
        intersectsRay(ray: pc.Ray, point?: pc.Vec3): boolean;
        /**
         * @function
         * @name pc.OrientedBox#containsPoint
         * @description Test if a point is inside a OBB.
         * @param {pc.Vec3} point Point to test.
         * @returns {Boolean} true if the point is inside the OBB and false otherwise.
         */
        containsPoint(point: pc.Vec3): boolean;
        /**
         * @function
         * @name pc.OrientedBox#intersectsBoundingSphere
         * @description Test if a Bounding Sphere is overlapping, enveloping, or inside this OBB.
         * @param {pc.BoundingSphere} sphere Bounding Sphere to test.
         * @returns {Boolean} true if the Bounding Sphere is overlapping, enveloping or inside this OBB and false otherwise.
         */
        intersectsBoundingSphere(sphere: pc.BoundingSphere): boolean;
    }
    /**
     * @constructor
     * @name pc.Ray
     * @classdesc An infinite ray
     * @description Creates a new infinite ray starting at a given origin and pointing in a given direction.
     * @example
     * // Create a new ray starting at the position of this entity and pointing down
     * // the entity's negative Z axis
     * var ray = new pc.Ray(this.entity.getPosition(), this.entity.forward);
     * @param {pc.Vec3} [origin] The starting point of the ray. The constructor takes a reference of this parameter.
     * Defaults to the origin (0, 0, 0).
     * @param {pc.Vec3} [direction] The direction of the ray. The constructor takes a reference of this parameter.
     * Defaults to a direction down the world negative Z axis (0, 0, -1).
     */
    class Ray {
        constructor(origin?: pc.Vec3, direction?: pc.Vec3);
    }
    /**
     * @constructor
     * @name pc.SoundInstance
     * @classdesc A pc.SoundInstance plays a {@link pc.Sound}
     * @param {pc.SoundManager} manager The sound manager
     * @param {pc.Sound} sound The sound to play
     * @param {Object} options Options for the instance
     * @param {Number} [options.volume=1] The playback volume, between 0 and 1.
     * @param {Number} [options.pitch=1] The relative pitch, default of 1, plays at normal pitch.
     * @param {Boolean} [options.loop=false] Whether the sound should loop when it reaches the end or not.
     * @param {Number} [options.startTime=0] The time from which the playback will start in seconds. Default is 0 to start at the beginning.
     * @param {Number} [options.duration=null] The total time after the startTime in seconds when playback will stop or restart if loop is true.
     * @param {Function} [options.onPlay=null] Function called when the instance starts playing.
     * @param {Function} [options.onPause=null] Function called when the instance is paused.
     * @param {Function} [options.onResume=null] Function called when the instance is resumed.
     * @param {Function} [options.onStop=null] Function called when the instance is stopped.
     * @param {Function} [options.onEnd=null] Function called when the instance ends.
     * @property {Number} volume The volume modifier to play the sound with. In range 0-1.
     * @property {Number} pitch The pitch modifier to play the sound with. Must be larger than 0.01
     * @property {Number} startTime The start time from which the sound will start playing.
     * @property {Number} currentTime Gets or sets the current time of the sound that is playing. If the value provided is bigger than the duration of the instance it will wrap from the beginning.
     * @property {Number} duration The duration of the sound that the instance will play starting from startTime.
     * @property {Boolean} loop If true the instance will restart when it finishes playing
     * @property {Boolean} isPlaying Returns true if the instance is currently playing.
     * @property {Boolean} isPaused Returns true if the instance is currently paused.
     * @property {Boolean} isStopped Returns true if the instance is currently stopped.
     * @property {Boolean} isSuspended Returns true if the instance is currently suspended because the window is not focused.
     * @property {AudioBufferSourceNode} source Gets the source that plays the sound resource. If the Web Audio API is not supported the type of source is <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio" target="_blank">Audio</a>. Source is only available after calling play.
     * @property {pc.Sound} sound The sound resource that the instance will play.
     */
    class SoundInstance {
        constructor(manager: pc.SoundManager, sound: pc.Sound, options: {
            volume?: number;
            pitch?: number;
            loop?: boolean;
            startTime?: number;
            duration?: number;
            onPlay?: (...params: any[]) => any;
            onPause?: (...params: any[]) => any;
            onResume?: (...params: any[]) => any;
            onStop?: (...params: any[]) => any;
            onEnd?: (...params: any[]) => any;
        });
        /**
         * @function
         * @name pc.SoundInstance#play
         * @description Begins playback of sound. If the sound is not loaded this will return false.
         * If the sound is already playing this will restart the sound.
         * @returns {Boolean} True if the sound was started.
         */
        play(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#pause
         * @description Pauses playback of sound. Call resume() to resume playback from the same position.
         * @returns {Boolean} Returns true if the sound was paused
         */
        pause(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#resume
         * @description Resumes playback of the sound. Playback resumes at the point that the audio was paused
         * @returns {Boolean} Returns true if the sound was resumed.
         */
        resume(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#stop
         * @description Stops playback of sound. Calling play() again will restart playback from the beginning of the sound.
         * @returns {Boolean} Returns true if the sound was stopped.
         */
        stop(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#setExternalNodes
         * @description Connects external Web Audio API nodes. You need to pass
         * the first node of the node graph that you created externally and the last node of that graph. The first
         * node will be connected to the audio source and the last node will be connected to the destination of the
         * AudioContext (e.g. speakers). Requires Web Audio API support.
         * @param {AudioNode} firstNode The first node that will be connected to the audio source of sound instances.
         * @param {AudioNode} [lastNode] The last node that will be connected to the destination of the AudioContext.
         * If unspecified then the firstNode will be connected to the destination instead.
         * @example
         * var context = app.systems.sound.context;
         * var analyzer = context.createAnalyzer();
         * var distortion = context.createWaveShaper();
         * var filter = context.createBiquadFilter();
         * analyzer.connect(distortion);
         * distortion.connect(filter);
         * instance.setExternalNodes(analyzer, filter);
         */
        setExternalNodes(firstNode: AudioNode, lastNode?: AudioNode): void;
        /**
         * @function
         * @name pc.SoundInstance#clearExternalNodes
         * @description Clears any external nodes set by {@link pc.SoundInstance#setExternalNodes}.
         */
        clearExternalNodes(): void;
        /**
         * @function
         * @name pc.SoundInstance#getExternalNodes
         * @description Gets any external nodes set by {@link pc.SoundInstance#setExternalNodes}.
         * @returns {AudioNode[]} Returns an array that contains the two nodes set by {@link pc.SoundInstance#setExternalNodes}.
         */
        getExternalNodes(): AudioNode[];
    }
    /**
     * @constructor
     * @name pc.SoundInstance3d
     * @extends pc.SoundInstance
     * @classdesc A pc.SoundInstance3d plays a {@link pc.Sound} in 3D
     * @param {pc.SoundManager} manager The sound manager
     * @param {pc.Sound} sound The sound to play
     * @param {Object} options Options for the instance
     * @param {Number} [options.volume=1] The playback volume, between 0 and 1.
     * @param {Number} [options.pitch=1] The relative pitch, default of 1, plays at normal pitch.
     * @param {Boolean} [options.loop=false] Whether the sound should loop when it reaches the end or not.
     * @param {Number} [options.startTime=0] The time from which the playback will start. Default is 0 to start at the beginning.
     * @param {Number} [options.duration=null] The total time after the startTime when playback will stop or restart if loop is true.
     * @param {pc.Vec3} [options.position=null] The position of the sound in 3D space.
     * @param {pc.Vec3} [options.velocity=null] The velocity of the sound.
     * @param {String} [options.distanceModel=pc.DISTANCE_LINEAR] Determines which algorithm to use to reduce the volume of the audio as it moves away from the listener. Can be one of {@link pc.DISTANCE_LINEAR}, {@link pc.DISTANCE_INVERSE} or {@link pc.DISTANCE_EXPONENTIAL}. Default is {@link pc.DISTANCE_LINEAR}.
     * @param {Number} [options.refDistance=1] The reference distance for reducing volume as the sound source moves further from the listener.
     * @param {Number} [options.maxDistance=10000] The maximum distance from the listener at which audio falloff stops. Note the volume of the audio is not 0 after this distance, but just doesn't fall off anymore.
     * @param {Number} [options.rollOffFactor=1] The factor used in the falloff equation.
     * @property {pc.Vec3} position The position of the sound in 3D space.
     * @property {pc.Vec3} velocity The velocity of the sound.
     * @property {String} distanceModel Determines which algorithm to use to reduce the volume of the audio as it moves away from the listener. Can be one of {@link pc.DISTANCE_LINEAR}, {@link pc.DISTANCE_INVERSE} or {@link pc.DISTANCE_EXPONENTIAL}. Default is {@link pc.DISTANCE_LINEAR}. * @property {Number} refDistance The reference distance for reducing volume as the sound source moves further from the listener.
     * @property {Number} maxDistance The maximum distance from the listener at which audio falloff stops. Note the volume of the audio is not 0 after this distance, but just doesn't fall off anymore.
     * @property {Number} rollOffFactor The factor used in the falloff equation.
     */
    class SoundInstance3d extends pc.SoundInstance {
        constructor(manager: pc.SoundManager, sound: pc.Sound, options: {
            volume?: number;
            pitch?: number;
            loop?: boolean;
            startTime?: number;
            duration?: number;
            position?: pc.Vec3;
            velocity?: pc.Vec3;
            distanceModel?: string;
            refDistance?: number;
            maxDistance?: number;
            rollOffFactor?: number;
        });
        /**
         * @function
         * @name pc.SoundInstance#play
         * @description Begins playback of sound. If the sound is not loaded this will return false.
         * If the sound is already playing this will restart the sound.
         * @returns {Boolean} True if the sound was started.
         */
        play(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#pause
         * @description Pauses playback of sound. Call resume() to resume playback from the same position.
         * @returns {Boolean} Returns true if the sound was paused
         */
        pause(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#resume
         * @description Resumes playback of the sound. Playback resumes at the point that the audio was paused
         * @returns {Boolean} Returns true if the sound was resumed.
         */
        resume(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#stop
         * @description Stops playback of sound. Calling play() again will restart playback from the beginning of the sound.
         * @returns {Boolean} Returns true if the sound was stopped.
         */
        stop(): boolean;
        /**
         * @function
         * @name pc.SoundInstance#setExternalNodes
         * @description Connects external Web Audio API nodes. You need to pass
         * the first node of the node graph that you created externally and the last node of that graph. The first
         * node will be connected to the audio source and the last node will be connected to the destination of the
         * AudioContext (e.g. speakers). Requires Web Audio API support.
         * @param {AudioNode} firstNode The first node that will be connected to the audio source of sound instances.
         * @param {AudioNode} [lastNode] The last node that will be connected to the destination of the AudioContext.
         * If unspecified then the firstNode will be connected to the destination instead.
         * @example
         * var context = app.systems.sound.context;
         * var analyzer = context.createAnalyzer();
         * var distortion = context.createWaveShaper();
         * var filter = context.createBiquadFilter();
         * analyzer.connect(distortion);
         * distortion.connect(filter);
         * instance.setExternalNodes(analyzer, filter);
         */
        setExternalNodes(firstNode: AudioNode, lastNode?: AudioNode): void;
        /**
         * @function
         * @name pc.SoundInstance#clearExternalNodes
         * @description Clears any external nodes set by {@link pc.SoundInstance#setExternalNodes}.
         */
        clearExternalNodes(): void;
        /**
         * @function
         * @name pc.SoundInstance#getExternalNodes
         * @description Gets any external nodes set by {@link pc.SoundInstance#setExternalNodes}.
         * @returns {AudioNode[]} Returns an array that contains the two nodes set by {@link pc.SoundInstance#setExternalNodes}.
         */
        getExternalNodes(): AudioNode[];
    }
    /**
     * @constructor
     * @name pc.SoundManager
     * @classdesc The SoundManager is used to load and play audio. As well as apply system-wide settings
     * like global volume, suspend and resume.
     * @description Creates a new sound manager.
     * @param {Object} [options] Options options object.
     * @param {Boolean} [options.forceWebAudioApi] Always use the Web Audio API even check indicates that it if not available
     * @property {Number} volume Global volume for the manager. All {@link pc.SoundInstance}s will scale their volume with this volume. Valid between [0, 1].
     */
    class SoundManager {
        constructor(options?: {
            forceWebAudioApi?: boolean;
        });
    }
    /**
     * @constructor
     * @name pc.Sound
     * @classdesc Represents the resource of an audio asset.
     * @param {HTMLAudioElement|AudioBuffer} resource If the Web Audio API is supported, pass an AudioBuffer object, otherwise
     * an Audio object.
     * @property {AudioBuffer} buffer If the Web Audio API is supported this contains the audio data
     * @property {HTMLAudioElement} audio If the Web Audio API is not supported this contains the audio data
     * @property {Number} duration Returns the duration of the sound. If the sound is not loaded it returns 0.
     */
    class Sound {
        constructor(resource: HTMLAudioElement | AudioBuffer);
    }
    /**
     * @constructor
     * @name pc.VrDisplay
     * @classdesc Represents a single Display for VR content. This could be a Head Mounted display that can present content on a separate screen
     * or a phone which can display content full screen on the same screen. This object contains the native `navigator.VRDisplay` object
     * from the WebVR API.
     * @description Represents a single Display for VR content. This could be a Head Mounted display that can present content on a separate screen
     * or a phone which can display content full screen on the same screen. This object contains the native `navigator.VRDisplay` object
     * from the WebVR API.
     * @param {pc.Application} app The application outputting to this VR display.
     * @param {VRDisplay} display The native VRDisplay object from the WebVR API.
     * @property {Number} id An identifier for this distinct VRDisplay
     * @property {VRDisplay} display The native VRDisplay object from the WebVR API
     * @property {Boolean} presenting True if this display is currently presenting VR content
     * @property {VRDisplayCapabilities} capabilities Returns the <a href="https://w3c.github.io/webvr/#interface-vrdisplaycapabilities" target="_blank">VRDisplayCapabilities</a> object from the VRDisplay.
     * This can be used to determine what features are available on this display.
     */
    class VrDisplay {
        constructor(app: pc.Application, display: VRDisplay);
        /**
         * @function
         * @name pc.VrDisplay#destroy
         * @description Destroy this display object
         */
        destroy(): void;
        /**
         * @function
         * @name pc.VrDisplay#poll
         * @description Called once per frame to update the current status from the display. Usually called by {@link pc.VrManager}.
         */
        poll(): void;
        /**
         * @function
         * @name pc.VrDisplay#requestPresent
         * @description Try to present full screen VR content on this display
         * @param {Function} callback Called when the request is completed. Callback takes a single argument (err) that is the error message return
         * if presenting fails, or null if the call succeeds. Usually called by {@link pc.CameraComponent#enterVr}.
         */
        requestPresent(callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.VrDisplay#exitPresent
         * @description Try to stop presenting VR content on this display
         * @param {Function} callback Called when the request is completed. Callback takes a single argument (err) that is the error message return
         * if presenting fails, or null if the call succeeds. Usually called by {@link pc.CameraComponent#exitVr}.
         */
        exitPresent(callback: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.VrDisplay#requestAnimationFrame
         * @description Used in the main application loop instead of the regular `window.requestAnimationFrame`. Usually only called from inside {@link pc.Application}
         * @param {Function} fn Function called when it is time to update the frame.
         */
        requestAnimationFrame(fn: (...params: any[]) => any): void;
        /**
         * @function
         * @name pc.VrDisplay#submitFrame
         * @description Called when animation update is complete and the frame is ready to be sent to the display. Usually only called from inside {@link pc.Application}.
         */
        submitFrame(): void;
        /**
         * @function
         * @name pc.VrDisplay#reset
         * @description Called to reset the pose of the pc.VrDisplay. Treating its current pose as the origin/zero. This should only be called in 'sitting' experiences.
         */
        reset(): void;
        /**
         * @function
         * @name pc.VrDisplay#setClipPlanes
         * @description Set the near and far depth plans of the display. This enables mapping of values in the
         * render target depth attachment to scene coordinates
         * @param {Number} n The near depth distance
         * @param {Number} f The far depth distance
         */
        setClipPlanes(n: number, f: number): void;
        /**
         * @function
         * @name pc.VrDisplay#getFrameData
         * @description Return the current frame data that is updated during polling.
         * @returns {VRFrameData} The frame data object
         */
        getFrameData(): VRFrameData;
    }
    /**
     * @constructor
     * @name pc.VrManager
     * @classdesc Manage and update {@link pc.VrDisplay}s that are attached to this device.
     * @description Manage and update {@link pc.VrDisplay}s that are attached to this device.
     * @param {pc.Application} app The main application
     * @property {pc.VrDisplay[]} displays The list of {@link pc.VrDisplay}s that are attached to this device
     * @property {pc.VrDisplay} display The default {@link pc.VrDisplay} to be used. Usually the first in the `displays` list
     * @property {Boolean} isSupported Reports whether this device supports the WebVR API
     */
    class VrManager {
        constructor(app: pc.Application);
        /**
         * @static
         * @name pc.VrManager.isSupported
         * @type Boolean
         * @description Reports whether this device supports the WebVR API
         */
        static isSupported: boolean;
        /**
         * @function
         * @name pc.VrManager#destroy
         * @description Remove events and clear up manager
         */
        destroy(): void;
        /**
         * @function
         * @name pc.VrManager#poll
         * @description Called once per frame to poll all attached displays
         */
        poll(): void;
    }
}

/**
 * @constructor
 * @name ScriptType
 * @classdesc Represents the type of a script. It is returned by {@link pc.createScript}. Also referred to as Script Type.<br />
 * The type is to be extended using its JavaScript prototype. There is a <strong>list of methods</strong>
 * that will be executed by the engine on instances of this type, such as: <ul><li>initialize</li><li>postInitialize</li><li>update</li><li>postUpdate</li><li>swap</li></ul>
 * <strong>initialize</strong> and <strong>postInitialize</strong> - are called if defined when script is about to run for the first time - postInitialize will run after all initialize methods are executed in the same tick or enabling chain of actions.<br />
 * <strong>update</strong> and <strong>postUpdate</strong> - methods are called if defined for enabled (running state) scripts on each tick.<br />
 * <strong>swap</strong> - This method will be called when a {@link ScriptType} that already exists in the registry gets redefined.
 * If the new {@link ScriptType} has a `swap` method in its prototype, then it will be executed to perform hot-reload at runtime.
 * @property {pc.Application} app The {@link pc.Application} that the instance of this type belongs to.
 * @property {pc.Entity} entity The {@link pc.Entity} that the instance of this type belongs to.
 * @property {Boolean} enabled True if the instance of this type is in running state. False when script is not running,
 * because the Entity or any of its parents are disabled or the Script Component is disabled or the Script Instance is disabled.
 * When disabled no update methods will be called on each tick.
 * initialize and postInitialize methods will run once when the script instance is in `enabled` state during app tick.
 * @param {Object} args The input arguments object
 * @param {Object} args.app The {@link pc.Application} that is running the script
 * @param {Object} args.entity The {@link pc.Entity} that the script is attached to
 *
 */
declare class ScriptType {
    constructor(args: {
        app: any;
        entity: any;
    });
    /**
     * @field
     * @static
     * @readonly
     * @type pc.ScriptAttributes
     * @name ScriptType.attributes
     * @description The interface to define attributes for Script Types. Refer to {@link pc.ScriptAttributes}
     * @example
     * var PlayerController = pc.createScript('playerController');
     *
     * PlayerController.attributes.add('speed', {
     *     type: 'number',
     *     title: 'Speed',
     *     placeholder: 'km/h',
     *     default: 22.2
     * });
     */
    static readonly attributes: pc.ScriptAttributes;
    /**
     * @readonly
     * @static
     * @function
     * @name ScriptType.extend
     * @param {Object} methods Object with methods, where key - is name of method, and value - is function.
     * @description Shorthand function to extend Script Type prototype with list of methods.
     * @example
     * var PlayerController = pc.createScript('playerController');
     *
     * PlayerController.extend({
     *     initialize: function() {
     *         // called once on initialize
     *     },
     *     update: function(dt) {
     *         // called each tick
     *     }
     * })
     */
    static extend(methods: any): void;
}

