
// common use
// const testDebugger = require('debug')('test');
// const fs = require('fs');
// const fileName = './uploaded/123.mp4';

//*************************************************************************************************/
//                                                                                                */
//  Buffer vs Stream on video: buffer more like a bucket, stream otherwise like pipe              */
//                                                                                                */
//*************************************************************************************************/
// const http =  require('http');
// const testPort = 3001;
// const createTestServer = () => {
//     http.createServer((req, res) => {

//         // stream method: use pipe
//         res.writeHeader(200, { 'Content-Type': 'video/mp4' });
//         fs.createReadStream(fileName)
//             .pipe(res)
//             .on('error', console.error);
    
//         // // buffer method: load once for all
//         // fs.readFile(file, (error, data) => {
//         //     if (error) {
//         //         console.log('hmmmm: ', error);
//         //     }
//         //     res.writeHeader(200, { 'Content-Type': 'video/mp4' });
//         //     res.end(data);
//         // });
//     }).listen(testPort, () => testDebugger('test server running on port:' + testPort));
// }

// createTestServer();
//*************************************************************************************************/
//                                                                                                */
//  readable fs module vs readable class: readable class                                          */
//                                                                                                */
//*************************************************************************************************/
// const {Readable} = require('stream');
// const advices = [
//   "No ice for drinks? Use frozen vegetables.",
//   "If you feel alone, watcha horror movie before going to be. You won't feel alone anymore.",
//   "Don't have sex after chopping jalapeños",
//   "If you can't blind them with brilliance, baffle them with nonsense",
//   "Always borrow money from a pessimist, they won't expect it back"
// ];

// class StreamFromArray extends Readable {
//   constructor(array){
//     super({ objectMode: true}); //encoding: 'UTF-8' => Converts buffer to string, two modes: object and binary(or string)
//     this.array = array;
//     this.index = 0
//   }

//   _read() {
//     if(this.index <= this.array.length){
//       const chunk = {
//         data: this.array[this.index],
//         index: this.index
//       }
//       this.push(chunk);
//       this.index += 1;
//     }else this.push(null);
//   }
// }

// const adviceStream = new StreamFromArray(advices);
// adviceStream.on('data', (chunk) => testDebugger(chunk));
// adviceStream.on('end', () => testDebugger("done!"));

//*************************************************************************************************/
//                                                                                                */
//  readable fs module vs readable class: readable fs                                             */
//                                                                                                */
//*************************************************************************************************/
// const readStream = fs.createReadStream(fileName);
// readStream.on('data', (chunk) => {
//     testDebugger("size:", chunk.length);
// })

// readStream.on('end', () => {
//     testDebugger("read stream ended");
// })

// readStream.on('error', (err) => {
//     testDebugger("an err has occured");
//     testDebugger.err(err);
// })

// readStream.pause();
// // stream also used in stdin
// process.stdin.on('data', (chunk) => {
//     let txt = chunk.toString().trim();
//     testDebugger("echo:", txt);
//     if (chunk.toString().trim() === 'done') {
//         readStream.resume(); // flowing stream
//     }

//     // non-flowing stream: wait for input to read another chunk
//     readStream.read();
// })