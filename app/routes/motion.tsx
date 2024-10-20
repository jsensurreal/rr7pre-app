import { motion } from 'framer-motion'

const gridContainerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
}

const gridSquareVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

export default function Motion() {
  return (
    <div className='flex flex-col gap-10 overflow-x-hidden'>
      <motion.section 
        variants={gridContainerVariants}
          initial='hidden'
          animate='show'
          className='grid grid-cols-3 p-10 gap-10'>
        <motion.div variants={gridSquareVariants} className='bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10'>
          <motion.div className='w-20 h-20 bg-stone-100 rounded-lg'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          ></motion.div>
          <motion.div className='w-20 h-20 bg-stone-100 rounded-full'
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          ></motion.div>
        </motion.div>
        <motion.div variants={gridSquareVariants} className='bg-slate-800 aspect-square rounded-lg flex'>
            <motion.div className='h-full shadow-md rounded-l-lg'
              initial={{ width: '10%', backgroundColor: '#fb7185' }}
              whileHover={{ width: '40%', backgroundColor: '#ffffff' }}
              transition={{ duration: .3 }}
            ></motion.div>
        </motion.div>
        <motion.div variants={gridSquareVariants} className='bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10'></motion.div>
        <motion.div variants={gridSquareVariants} className='bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10'></motion.div>
        <motion.div variants={gridSquareVariants} className='bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10'></motion.div>
        <motion.div variants={gridSquareVariants} className='bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10'></motion.div>
      </motion.section>
    </div>
  )
}