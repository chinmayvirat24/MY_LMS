export default function CertificatesPage() {
  const certificates = [
    {
      title: "Python Foundations Certificate",
      issuedOn: "March 12, 2026",
      grade: "Distinction"
    },
    {
      title: "React Starter Kit Certificate",
      issuedOn: "February 28, 2026",
      grade: "Excellent"
    },
    {
      title: "SQL Foundations Certificate",
      issuedOn: "February 19, 2026",
      grade: "Distinction"
    },
    {
      title: "Node API Fundamentals Certificate",
      issuedOn: "January 25, 2026",
      grade: "Excellent"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
          Certificates
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
          Your recent completions and verified credentials.
        </h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {certificates.map((certificate) => (
          <div
            key={certificate.title}
            className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-card"
          >
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              Certificate
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {certificate.title}
            </h2>
            <p className="mt-4 text-sm text-slate-500">Issued on {certificate.issuedOn}</p>
            <p className="mt-1 text-sm text-slate-500">Grade: {certificate.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
