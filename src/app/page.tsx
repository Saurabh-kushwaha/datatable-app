"use client"
import DataTable from '../components/DataTable';
import styles from "./page.module.css";

export default function Home() {
  const headers = ['TIMESTAMP','PURCHASE ID', 'MAIL', 'NAME', 'SOURCE', 'STATUS', 'SELECT'];
  return (
    <div className={styles.main}>
      <DataTable headers={headers} />
    </div>
  );
}
