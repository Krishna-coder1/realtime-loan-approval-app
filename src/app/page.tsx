import styles from "./page.module.css";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main title="BFB Ba" className={styles.main}>
      <LoginForm htmlHashProps={<html />} />
    </main>
  );
}
