import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import Image from 'next/image';

// 服務卡片組件
interface ServiceCardProps {
  title: string;
  description: string;
}

function ServiceCard({ title, description }: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative rounded-lg shadow-md overflow-hidden min-h-[200px] transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Image
        src='/engineers.jpg'
        alt={title}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <div className='absolute inset-0 bg-black/50'></div>
      <div className='relative p-6 z-10'>
        <h3 className='text-xl font-bold mb-4 text-white'>{title}</h3>
        <p className='text-white'>{description}</p>
      </div>
    </div>
  );
}

export default function ServiceBlock() {
  const services = [
    { title: '服務項目1', description: '這是服務項目1的描述' },
    { title: '服務項目2', description: '這是服務項目2的描述' },
    { title: '服務項目3', description: '這是服務項目3的描述' },
    { title: '服務項目4', description: '這是服務項目4的描述' },
    { title: '服務項目5', description: '這是服務項目5的描述' },
    { title: '服務項目6', description: '這是服務項目6的描述' },
    { title: '服務項目7', description: '這是服務項目7的描述' },
  ];

  return (
    <div className='max-w-6xl mx-auto'>
      <h2 className='text-3xl font-bold text-center mb-8'>服務項目</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
}
