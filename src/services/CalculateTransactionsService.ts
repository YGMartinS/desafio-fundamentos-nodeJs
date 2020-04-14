import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface BalancedTransactions {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export default class CalculateTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository =  transactionsRepository;
  }

  public execute(): BalancedTransactions {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    const balancedTransactions: BalancedTransactions = {
      transactions,
      balance
      };

    return balancedTransactions;
  }
}

