import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "License",
  description: "MIT License for the Airbnb Clone project.",
};

export default function LicensePage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Help" }, { label: "License" }]} />
      <h1>License</h1>
      <p>The Airbnb Clone project is open source under the MIT License.</p>

      <div className="not-prose rounded-xl border border-white/[0.07] bg-[#0d0d0f] p-6 font-mono text-sm text-zinc-400 leading-relaxed">
        <pre className="whitespace-pre-wrap">{`MIT License

Copyright (c) ${new Date().getFullYear()} Aryan07175

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}</pre>
      </div>

      <h2>Third-Party Licenses</h2>
      <table>
        <thead><tr><th>Package</th><th>License</th></tr></thead>
        <tbody>
          <tr><td>Next.js</td><td>MIT</td></tr>
          <tr><td>FastAPI</td><td>MIT</td></tr>
          <tr><td>SQLAlchemy</td><td>MIT</td></tr>
          <tr><td>TailwindCSS</td><td>MIT</td></tr>
          <tr><td>Framer Motion</td><td>MIT</td></tr>
          <tr><td>Leaflet</td><td>BSD-2-Clause</td></tr>
          <tr><td>Lucide React</td><td>ISC</td></tr>
          <tr><td>Pydantic</td><td>MIT</td></tr>
        </tbody>
      </table>

      <p>
        This project was built as an SDE Full Stack Engineering Assignment.
        It is not affiliated with, endorsed by, or connected to Airbnb, Inc. in any way.
        All Airbnb trademarks and brand identities belong to their respective owners.
      </p>
    </div>
  );
}
