import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';

function LandingPage() {
  return (
    <main className="landing">
      <p className="eyebrow">A living family archive</p>
      <h1>Every family has a story worth keeping.</h1>
      <p className="intro">
        Build a thoughtful record of the people, relationships and history that connect your family.
      </p>
      <p className="privacy-note">Private by default. Shared only with the people you invite.</p>
    </main>
  );
}

function WorkspacePage({ title }: { title: string }) {
  const { familyId } = useParams();

  return (
    <main className="workspace-empty">
      <p className="eyebrow">Family workspace</p>
      <h1>{title}</h1>
      <p>
        {familyId
          ? 'Workspace data will appear here after the authenticated family API is connected.'
          : 'Choose a family workspace to continue.'}
      </p>
      <Link to="/">Back to home</Link>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="workspace-empty">
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/families" element={<WorkspacePage title="Your families" />} />
          <Route path="/families/:familyId" element={<Navigate to="people" replace />} />
          <Route path="/families/:familyId/people" element={<WorkspacePage title="People" />} />
          <Route path="/families/:familyId/tree" element={<WorkspacePage title="Family tree" />} />
          <Route path="/families/:familyId/members" element={<WorkspacePage title="Members" />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}