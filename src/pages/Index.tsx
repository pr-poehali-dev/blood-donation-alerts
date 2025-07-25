import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const bloodStations = [
  {
    id: 1,
    name: "Центр крови им. О.К. Гаврилова",
    address: "Москва, ул. Поликарпова, д. 14",
    phone: "+7 (495) 945-33-19",
    hours: "Пн-Пт 8:00-15:00",
    distance: "2.3 км",
    requirements: "Rh-, возраст 18-55",
    availability: "Срочно требуется"
  },
  {
    id: 2,
    name: "НИИ гематологии и трансфузиологии",
    address: "СПб, ул. 2-я Советская, д. 16",
    phone: "+7 (812) 274-34-50",
    hours: "Пн-Чт 9:00-16:00",
    distance: "1.8 км",
    requirements: "Rh-, вес >50кг",
    availability: "Требуется"
  },
  {
    id: 3,
    name: "Региональный центр крови",
    address: "Екатеринбург, ул. Шейнкмана, д. 44",
    phone: "+7 (343) 240-40-40",
    hours: "Вт-Сб 8:30-14:30",
    distance: "3.7 км",
    requirements: "Rh-, здоровье ✓",
    availability: "Умеренная потребность"
  }
];

const donorRequirements = [
  {
    category: "Общие требования",
    items: [
      "Возраст от 18 до 55 лет",
      "Вес не менее 50 кг",
      "Отсутствие хронических заболеваний",
      "Отрицательный резус-фактор (Rh-)"
    ]
  },
  {
    category: "Медицинские ограничения",
    items: [
      "Отсутствие инфекционных заболеваний",
      "Нормальное артериальное давление",
      "Отсутствие анемии (Hb >120 г/л)",
      "Отсутствие приема антибиотиков (30 дней)"
    ]
  },
  {
    category: "Образ жизни",
    items: [
      "Полноценный сон (не менее 7 часов)",
      "Отсутствие алкоголя (48 часов)",
      "Легкий завтрак перед донацией",
      "Достаточное потребление жидкости"
    ]
  }
];

const procedureSteps = [
  {
    step: 1,
    title: "Регистрация",
    description: "Заполнение анкеты донора и предоставление документов",
    duration: "10-15 мин"
  },
  {
    step: 2,
    title: "Медицинский осмотр",
    description: "Измерение давления, пульса, температуры, экспресс-анализ крови",
    duration: "15-20 мин"
  },
  {
    step: 3,
    title: "Плазмаферез",
    description: "Забор крови, разделение плазмы и возврат клеток крови",
    duration: "40-60 мин"
  },
  {
    step: 4,
    title: "Отдых и питание",
    description: "Отдых в донорском зале с легкими закусками",
    duration: "15-30 мин"
  }
];

const faqData = [
  {
    question: "Что такое антирезусная плазма?",
    answer: "Антирезусная плазма содержит антитела против резус-фактора. Она жизненно важна для лечения гемолитической болезни новорожденных и предотвращения резус-конфликта при беременности."
  },
  {
    question: "Как часто можно сдавать антирезусную плазму?",
    answer: "Плазму можно сдавать не чаще 1 раза в 2 недели и не более 12 раз в год. Интервал между донациями должен составлять минимум 14 дней."
  },
  {
    question: "Какие льготы полагаются донорам?",
    answer: "Доноры получают денежную компенсацию, 2 дня отдыха, льготное питание и ежегодное медицинское обследование. Почетные доноры имеют дополнительные социальные льготы."
  },
  {
    question: "Безопасна ли процедура плазмафереза?",
    answer: "Да, процедура полностью безопасна. Используется стерильное одноразовое оборудование, забор проводится под медицинским контролем с соблюдением всех санитарных норм."
  },
  {
    question: "Какие документы нужны для донации?",
    answer: "Необходимы: паспорт, медицинская справка от терапевта (действительна 30 дней), результаты анализов на инфекции (ВИЧ, гепатиты B и C, сифилис)."
  }
];

export default function Index() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    email: '',
    sms: '',
    location: '',
    urgency: 'high'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-medical-blue text-white p-2 rounded-lg">
                <Icon name="Droplets" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ДонорПлазма</h1>
                <p className="text-sm text-gray-600">Служба уведомлений для доноров</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
              <Button size="sm" className="bg-medical-blue hover:bg-medical-blue/90">
                <Icon name="MapPin" size={16} className="mr-2" />
                Найти станцию
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blood-red/10 text-blood-red hover:bg-blood-red/20">
                Срочно требуется Rh-
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Станьте донором
                <span className="text-medical-blue block">антирезусной плазмы</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ваша плазма может спасти жизни новорожденных и помочь женщинам с резус-конфликтом. 
                Присоединяйтесь к сети доноров и получайте уведомления о станциях рядом с вами.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-medical-blue hover:bg-medical-blue/90 text-lg px-8 py-3">
                  <Icon name="Heart" size={20} className="mr-2" />
                  Стать донором
                </Button>
                <Button variant="outline" className="text-lg px-8 py-3">
                  <Icon name="Play" size={20} className="mr-2" />
                  Как это работает
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/img/3c4ddb39-b20e-40c3-9560-5ad55350dd46.jpg"
                alt="Медицинский специалист"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-medical-green text-white p-2 rounded-lg">
                    <Icon name="Users" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">1,247</p>
                    <p className="text-sm text-gray-600">активных доноров</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Найдите ближайшую станцию переливания крови
            </h2>
            <p className="text-lg text-gray-600">
              Введите ваше местоположение для поиска доступных станций
            </p>
          </div>
          
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Введите город или адрес..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="text-lg py-3"
                />
              </div>
              <Button className="bg-medical-blue hover:bg-medical-blue/90 px-8 py-3">
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Blood Stations */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Станции переливания крови
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodStations.map((station) => (
              <Card key={station.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{station.name}</CardTitle>
                    <Badge 
                      variant={station.availability === "Срочно требуется" ? "destructive" : "secondary"}
                      className={station.availability === "Срочно требуется" ? "bg-blood-red" : ""}
                    >
                      {station.availability}
                    </Badge>
                  </div>
                  <CardDescription>{station.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Icon name="Phone" size={16} className="mr-2 text-gray-500" />
                      {station.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <Icon name="Clock" size={16} className="mr-2 text-gray-500" />
                      {station.hours}
                    </div>
                    <div className="flex items-center text-sm">
                      <Icon name="MapPin" size={16} className="mr-2 text-gray-500" />
                      {station.distance}
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-1">Требования:</p>
                      <p className="text-sm text-gray-600">{station.requirements}</p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Navigation" size={14} className="mr-1" />
                        Маршрут
                      </Button>
                      <Button size="sm" className="flex-1 bg-medical-blue hover:bg-medical-blue/90">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        Записаться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Information Tabs */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="requirements" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="requirements">Требования</TabsTrigger>
              <TabsTrigger value="procedure">Процедура</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Требования к донорам антирезусной плазмы
                </h2>
                <p className="text-lg text-gray-600">
                  Проверьте, подходите ли вы для донации антирезусной плазмы
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {donorRequirements.map((req, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl text-medical-blue">{req.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {req.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-medical-green mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="procedure" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Как проходит процедура сдачи плазмы
                </h2>
                <p className="text-lg text-gray-600">
                  Пошаговое описание процесса донации антирезусной плазмы
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {procedureSteps.map((step, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-medical-blue text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <Badge variant="secondary">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Настройка уведомлений
                </h2>
                <p className="text-lg text-gray-600">
                  Получайте уведомления о срочной потребности в антирезусной плазме
                </p>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Bell" size={20} className="mr-2 text-medical-blue" />
                    Параметры уведомлений
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email для уведомлений</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={notificationSettings.email}
                      onChange={(e) => setNotificationSettings({...notificationSettings, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Телефон для SMS</label>
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={notificationSettings.sms}
                      onChange={(e) => setNotificationSettings({...notificationSettings, sms: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ваше местоположение</label>
                    <Input
                      placeholder="Москва, Санкт-Петербург, Екатеринбург..."
                      value={notificationSettings.location}
                      onChange={(e) => setNotificationSettings({...notificationSettings, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full bg-medical-blue hover:bg-medical-blue/90">
                      <Icon name="Bell" size={16} className="mr-2" />
                      Включить уведомления
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-gray-600">
              Ответы на популярные вопросы о донации антирезусной плазмы
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-medical-blue text-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Нужна помощь или дополнительная информация?
              </h2>
              <p className="text-lg mb-8 text-blue-100">
                Свяжитесь с нашей службой поддержки доноров. Мы работаем круглосуточно 
                и готовы ответить на все ваши вопросы о донации антирезусной плазмы.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-blue-200" />
                  <span className="text-lg">+7 (800) 555-00-00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-blue-200" />
                  <span className="text-lg">info@donorplasma.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={20} className="text-blue-200" />
                  <span className="text-lg">Онлайн-чат доступен 24/7</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Экстренные случаи</CardTitle>
                <CardDescription className="text-blue-100">
                  При срочной потребности в антирезусной плазме
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blood-red/20 border border-blood-red/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertTriangle" size={20} className="text-yellow-300" />
                      <span className="font-semibold text-white">Срочный вызов</span>
                    </div>
                    <p className="text-sm text-blue-100">
                      +7 (800) 911-00-00 - горячая линия для экстренных случаев
                    </p>
                  </div>
                  
                  <Button variant="secondary" className="w-full">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Написать в чат поддержки
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-medical-blue text-white p-2 rounded-lg">
                  <Icon name="Droplets" size={20} />
                </div>
                <span className="font-bold text-lg">ДонорПлазма</span>
              </div>
              <p className="text-gray-400 text-sm">
                Сервис уведомлений для доноров антирезусной плазмы. 
                Спасаем жизни вместе.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Донорам</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Требования</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Процедура</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Льготы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Сертификаты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Станции</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Найти станцию</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Расписание</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Политика</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 ДонорПлазма. Все права защищены. Лицензия Минздрава РФ № ЛО-77-01-000000
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}