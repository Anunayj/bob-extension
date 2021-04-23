enum MessageTypes {
  // wallet
  GENERATE_NEW_MNEMONIC = 'generate_new_mnemonic',
  CREATE_NEW_WALLET = 'create_new_wallet',
  GET_WALLET_STATE = 'get_wallet_state',
  GET_WALLET_IDS = 'get_wallet_ids',
  GET_WALLET_RECEIVE_ADDRESS = 'get_wallet_receive_address',
  GET_WALLET_BALANCE = 'get_wallet_balance',
  SELECT_WALLET = 'select_wallet',
  UNLOCK_WALLET = 'unlock_wallet',
  ADD_TX_QUEUE = 'add_tx_queue',
  LOCK_WALLET = 'lock_wallet',
  FULL_RESCAN = 'full_rescan',
  CHECK_FOR_RESCAN = 'check_for_rescan',
  GET_TRANSACTIONS = 'get_transactions',
  GET_TX_NONCE = 'get_tx_nonce',
  RESET_TRANSACTIONS = 'reset_transactions',
  RESET_DOMAINS = 'reset_domains',
  GET_PENDING_TRANSACTIONS = 'get_pending_transactions',
  GET_DOMAIN_NAMES = 'get_domain_names',
  GET_NAME_NONCE = 'get_name_nonce',
  CREATE_TX = 'create_tx',
  CREATE_BID = 'create_bid',
  UPDATE_TX_QUEUE = 'update_tx_queue',
  GET_TX_QUEUE = 'get_tx_queue',
  SUBMIT_TX = 'submit_tx',
  REJECT_TX = 'reject_tx',
  UPDATE_TX_FROM_QUEUE = 'updateTxFromQueue',
  REMOVE_TX_FROM_QUEUE = 'removeTxFromQueue',

  // node
  GET_LATEST_BLOCK = 'get_latest_block',
  GET_NAME_BY_HASH = 'get_name_by_hash',
  ESTIMATE_SMART_FEE = 'estimate_smart_fee',

  // Bob3
  CONNECT = 'connect',
  SEND_TX = 'send_tx',
  SEND_BID = 'send_bid',
}

export default MessageTypes;
