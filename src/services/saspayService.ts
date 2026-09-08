export interface SaspayConfig {
  merchantId: string;
  apiKey: string;
  secretKey: string;
  environment: 'sandbox' | 'live';
  currency: string;
  defaultNetwork: 'all' | 'mtn' | 'moov' | 'wave' | 'card';
  receiverPhone: string;
  isActive: boolean;
  autoValidateTestPayment: boolean;
}

export interface SaspayTransaction {
  transactionId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  customerPhone: string;
  customerName: string;
  network: 'mtn' | 'moov' | 'wave' | 'card';
  status: 'pending' | 'successful' | 'failed';
  createdAt: string;
  message?: string;
}

const STORAGE_KEY_CONFIG = 'kayashop_saspay_config_v1';
const STORAGE_KEY_TX = 'kayashop_saspay_transactions_v1';

export const DEFAULT_SASPAY_CONFIG: SaspayConfig = {
  merchantId: 'SAS-KAYA-BENIN-229',
  apiKey: 'sas_live_pk_9948271038491823',
  secretKey: 'sas_live_sk_••••••••••••••••••••••••••••••••',
  environment: 'sandbox',
  currency: 'XOF',
  defaultNetwork: 'all',
  receiverPhone: '+229 43 79 70 42',
  isActive: true,
  autoValidateTestPayment: true,
};

export const saspayService = {
  getConfig(): SaspayConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(DEFAULT_SASPAY_CONFIG));
        return DEFAULT_SASPAY_CONFIG;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_SASPAY_CONFIG;
    }
  },

  saveConfig(config: SaspayConfig): void {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  },

  getTransactions(): SaspayTransaction[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TX);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  logTransaction(tx: SaspayTransaction): void {
    const list = this.getTransactions();
    list.unshift(tx);
    localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(list.slice(0, 100)));
  },

  updateTransactionStatus(transactionId: string, status: 'successful' | 'failed', message?: string): void {
    const list = this.getTransactions().map(tx => {
      if (tx.transactionId === transactionId) {
        return { ...tx, status, message: message || tx.message };
      }
      return tx;
    });
    localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(list));
  },

  generateTransactionReference(): string {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `SAS-${Date.now().toString().slice(-4)}-${random}`;
  }
};
