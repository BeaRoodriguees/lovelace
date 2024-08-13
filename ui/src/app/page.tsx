import classes from './page.module.css';

export default function Home() {
  return (
    <main className={classes.container}>
      {/* <Navbar></Navbar> */}
      <div className={classes.content}>
        <h1>Welcome page - Hero section</h1>
      </div>
    </main>
  );
}
