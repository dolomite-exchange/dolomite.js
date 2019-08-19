
/*
 * Exports Slate at `dolomite/slate` along with other classes ( { Period } for example)
 */
var slate = require('../lib/Slate/Slate').default;
require('../lib/common/util/exportPackage').default(exports, slate);
