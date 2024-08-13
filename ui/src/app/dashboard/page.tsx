import classes from './page.module.css';

export default function Dashboard() {
  return (
    <div className={classes.container}>
      <h1>Dashboard</h1>
      <p>Only admins should access it.</p>
    </div>
  );
}
