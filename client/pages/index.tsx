import Layout from '../components/Layout/Layout'
import homeStyles from '../pageUtils/Home/Home.module.css';
import workplaceSvg from '../files/pracovna-finished_bila.svg';
import Image from 'next/image'
import Background from '../components/Layout/Background';
function Home() {

  return (
    <Layout>
      <div className={homeStyles.home_wrapper}>
        <Background />
        <div className={homeStyles.content}>
          <div className={homeStyles.heading}>Welcome to Worklfow Manager</div>
          <Image src={workplaceSvg as any} alt="workplace" />
        </div>
      </div>
    </Layout>
  )
}

export default Home;
