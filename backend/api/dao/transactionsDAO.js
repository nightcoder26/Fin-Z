import mongodb from "mongodb";
let transactions;
export default class TransactionsDOA {
  static async injectDB(conn) {
    if (transactions) {
      return;
    }
    transactions = await conn
      .db(process.env.FINZ_NS)
      .collection("transactions");
  }
}
