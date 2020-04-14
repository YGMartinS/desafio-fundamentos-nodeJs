import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = []

    this.balance = {
      income: 0,
      outcome: 0,
      total: 0
    }
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public updateBalance() {
    const totalIncome = this.transactions
                  .filter(transaction => transaction.type === 'income')
                  .map(transaction => transaction.value)
                  .reduce(function(acumulado, atual) {
                    return acumulado + atual
                  }, 0);

    const totalOutcome = this.transactions
                    .filter(transaction => transaction.type === 'outcome')
                    .map(transaction => transaction.value)
                    .reduce(function(acumulado, atual) {
                      return acumulado + atual
                    }, 0);

    const total = totalIncome - totalOutcome;

    const newBalance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total
    };

    this.balance = newBalance;
  }

  public create({title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
