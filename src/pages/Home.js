import GlutenFree from '../components/GlutenFree';
import Random from '../components/Random';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <Random />
      <GlutenFree />
    </motion.div>
  );
};

export default Home;
