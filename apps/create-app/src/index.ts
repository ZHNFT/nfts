import Creator from "./Creator";
const cli = new Creator();
const _cli = 2;
let a = 12;
a = "13";
cli.execute().then(
  () => {
    //
  },
  (e) => {
    console.log(e);
    process.exit(1);
  }
);
