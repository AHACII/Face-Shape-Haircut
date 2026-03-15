import { FaceShape, HairstyleSuggestion } from '../types';

export const hairstyleSuggestions: Record<FaceShape, HairstyleSuggestion[]> = {
  Round: [
    {
      name: 'Pompadour',
      description: 'يضيف طولاً للوجه ويقلل من مظهر الاستدارة',
    },
    {
      name: 'Side Part with Volume',
      description: 'يخلق خطوطاً زاوية تكسر الاستدارة',
    },
    {
      name: 'Crew Cut',
      description: 'قصيرة من الجوانب وأطول من الأعلى لإضافة طول',
    },
    {
      name: 'Quiff',
      description: 'يمنح ارتفاعاً ويطيل الوجه بصرياً',
    },
  ],
  Square: [
    {
      name: 'Textured Crop',
      description: 'يخفف من حدة زوايا الفك القوية',
    },
    {
      name: 'Faux Hawk',
      description: 'يوازن الفك العريض بإضافة حجم للأعلى',
    },
    {
      name: 'Messy Fringe',
      description: 'يلطف الخطوط المربعة للوجه',
    },
    {
      name: 'Side Swept',
      description: 'يضيف حركة ناعمة تكسر الزوايا الحادة',
    },
  ],
  Oval: [
    {
      name: 'Any Style Works!',
      description: 'الوجه البيضاوي يناسب معظم التسريحات',
    },
    {
      name: 'Classic Short Back & Sides',
      description: 'تسريحة كلاسيكية أنيقة',
    },
    {
      name: 'Long Layers',
      description: 'مناسب للشعر الطويل',
    },
    {
      name: 'Undercut',
      description: 'عصري ومناسب تماماً',
    },
  ],
  Heart: [
    {
      name: 'Fringe',
      description: 'يوازن الجبهة العريضة مع الذقن الضيقة',
    },
    {
      name: 'Side Swept Bangs',
      description: 'يقلل من عرض الجبهة',
    },
    {
      name: 'Textured Quiff',
      description: 'يضيف توازناً للنصف السفلي من الوجه',
    },
    {
      name: 'Medium Length',
      description: 'يخلق توازناً بين الجبهة والذقن',
    },
  ],
  Oblong: [
    {
      name: 'Short on Top',
      description: 'يقلل من طول الوجه الظاهري',
    },
    {
      name: 'Medium Layers with Side Part',
      description: 'يضيف عرضاً للوجه',
    },
    {
      name: 'Fringe',
      description: 'يقلل من مظهر الطول',
    },
    {
      name: 'Textured Crop',
      description: 'يوازن نسب الوجه',
    },
  ],
  Diamond: [
    {
      name: 'Side Part',
      description: 'يوازن عظام الخدود البارزة',
    },
    {
      name: 'Textured Quiff',
      description: 'يوازن الجبهة الضيقة',
    },
    {
      name: 'Caesar Cut',
      description: 'يناسب الذقن الضيقة',
    },
    {
      name: 'Slicked Back',
      description: 'يظهر ملامح الوجه بشكل متوازن',
    },
  ],
};
