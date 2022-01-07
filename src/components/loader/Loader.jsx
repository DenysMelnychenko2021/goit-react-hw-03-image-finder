import s from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={s.PreLoader}>
      <div className={s.Loader}></div>
    </div>
  );
};
