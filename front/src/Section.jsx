import { AuthContext } from './AuthContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <AuthContext.Provider value={level}>
        {children}
      </AuthContext.Provider>
    </section>
  );
}

