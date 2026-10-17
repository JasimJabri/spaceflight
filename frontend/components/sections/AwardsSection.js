import SectionMeta from '../SectionMeta';
import CtaButton from '../CtaButton';

const DEFAULT_AWARDS = [
  { year: '2022', type: 'Award', name: 'Construction & Project Delivery Award' },
  { year: '2021', type: 'Accreditation', name: 'Occupational Health and Safety (OHSAS: 45001:2018)' },
  { year: '2021', type: 'Award', name: 'Contractor Achievement Award' },
  { year: '2020', type: 'Accreditation', name: 'Quality (ISO 9001:2015)' },
  { year: '2019', type: 'Award', name: 'Innovation & Performance Excellence' },
  { year: '2018', type: 'Accreditation', name: 'Environmental (ISO: 14001:2004)' },
];

export default function AwardsSection({ data }) {
  const awards = data?.awards?.length ? data.awards : DEFAULT_AWARDS;

  return (
    <section className="bg-[#1a1a1a] text-white py-20 px-6 md:px-12">
      <SectionMeta label="Recognition" count={awards.length} light />
      <h2 className="text-5xl md:text-8xl font-black mb-20">Awards &<br />Accreditations</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-700">
            <th className="text-left py-3 font-normal w-1/6">Year:</th>
            <th className="text-left py-3 font-normal w-1/4">Type:</th>
            <th className="text-left py-3 font-normal">Name:</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((a, i) => (
            <tr key={i} className="border-b border-gray-700 hover:bg-white/5 transition-colors">
              <td className="py-4 text-gray-300">{a.year}</td>
              <td className="py-4 text-gray-300">{a.type}</td>
              <td className="py-4 font-bold">{a.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-12">
        <CtaButton label="View All Accreditations" />
      </div>
    </section>
  );
}
