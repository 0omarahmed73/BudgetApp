import './Transactions.css'
import TransHeader from './shared/TransHeader'
import TranContent from './shared/TranContent';

const Transactions = () => {
  return (
    <div className="trans">
      <div className="container">
        <TransHeader />
        <TranContent />
      </div>
    </div>
  )
}

export default Transactions