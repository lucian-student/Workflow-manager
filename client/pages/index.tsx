import Layout from '../components/Layout/Layout'
import homeStyles from '../pageUtils/Home/Home.module.css';
import workplaceSvg from '../files/pracovna-finished_bila.svg';
import Image from 'next/image'
function Home() {

  return (
    <Layout>
      <div className={homeStyles.home_wrapper}>
        <div className={homeStyles.background}>
          <div className={homeStyles.background_left} />
          <div className={homeStyles.empty_stripe} />
          <div className={homeStyles.background_right} />
        </div>
        <div className={homeStyles.content}>
          <div className={homeStyles.heading}>Welcome to Worklfow Manager</div>
          <Image src={workplaceSvg as any} alt="workplace" />
        </div>
      </div>
    </Layout>
  )
}

export default Home;
