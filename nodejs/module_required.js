

function Hello(name) {
    this.name = name || 'default';
    this.displayName = function () {
        console.log(this.name);
    }
    this.setName = function (name) {
        this.name = name;
    }
}

module.exports = Hello;



// module.exports.Hello = function (name) {
//     this.name = name || 'default';
//     this.displayName = function () {
//         console.log(this.name);
//     }
//     this.setName = function (name) {
//         this.name = name;
//     }
// };

