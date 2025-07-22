import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const urgentNotifications = [
  {
    id: 1,
    title: "Срочно требуется Rh- плазма!",
    location: "НИИ Гематологии, Москва",
    distance: "2.1 км от вас",
    urgency: "critical",
    timeLeft: "4 часа",
    compensation: "3,500 ₽",
    timestamp: "15 минут назад"
  },
  {
    id: 2,
    title: "Нужна антирезусная плазма",
    location: "Центр крови им. Гаврилова",
    distance: "3.8 км от вас",
    urgency: "high", 
    timeLeft: "до завтра",
    compensation: "2,800 ₽",
    timestamp: "1 час назад"
  }
];

const nearbyStations = [
  {
    id: 1,
    name: "НИИ Гематологии и трансфузиологии",
    address: "ул. Академика Опарина, 4",
    phone: "+7 (495) 612-14-31",
    distance: "2.1 км",
    status: "urgent",
    requirements: "Rh-, возраст 18-55, вес >50кг",
    workingHours: "Пн-Пт 8:00-16:00",
    currentNeed: "Критическая потребность",
    lastUpdate: "10 мин назад",
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: "Центр крови им. О.К. Гаврилова",
    address: "ул. Поликарпова, 14",
    phone: "+7 (495) 945-33-19", 
    distance: "3.8 км",
    status: "needed",
    requirements: "Rh-, здоровье в норме",
    workingHours: "Пн-Сб 7:30-15:30",
    currentNeed: "Требуется",
    lastUpdate: "25 мин назад",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "ФНКЦ детской гематологии",
    address: "ул. Саморы Машела, 1",
    phone: "+7 (495) 287-65-70",
    distance: "5.2 км", 
    status: "available",
    requirements: "Rh-, опыт донации приветствуется",
    workingHours: "Вт-Сб 8:30-14:00",
    currentNeed: "Умеренная потребность",
    lastUpdate: "2 часа назад",
    rating: 4.9,
    reviews: 203
  }
];

const notificationTypes = [
  {
    id: 'urgent',
    title: 'Критические уведомления',
    description: 'Срочная потребность в плазме (жизнеугрожающие ситуации)',
    icon: 'AlertTriangle',
    color: 'text-blood-red'
  },
  {
    id: 'nearby', 
    title: 'Ближайшие станции',
    description: 'Уведомления о потребности в станциях рядом с вами (до 10 км)',
    icon: 'MapPin',
    color: 'text-medical-blue'
  },
  {
    id: 'scheduled',
    title: 'Плановые напоминания', 
    description: 'Напоминания о возможности повторной донации через 14 дней',
    icon: 'Calendar',
    color: 'text-medical-green'
  },
  {
    id: 'compensation',
    title: 'Повышенная компенсация',
    description: 'Уведомления о повышенных выплатах за донацию',
    icon: 'DollarSign', 
    color: 'text-notification-orange'
  }
];

export default function Index() {
  const [location, setLocation] = useState('');
  const [notifications, setNotifications] = useState({
    urgent: true,
    nearby: true, 
    scheduled: false,
    compensation: true
  });
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    name: ''
  });
  const [maxDistance, setMaxDistance] = useState(10);

  const handleNotificationToggle = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-plasma-pink to-medical-blue text-white p-2 rounded-xl">
                <Icon name="Bell" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-plasma-pink to-medical-blue bg-clip-text text-transparent">
                  PlasmaAlert
                </h1>
                <p className="text-sm text-gray-600">Уведомления для женщин-доноров</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-blood-red/10 text-blood-red">
                <Icon name="Zap" size={12} className="mr-1" />
                2 срочных
              </Badge>
              <Button size="sm" className="bg-plasma-pink hover:bg-plasma-pink/90">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Urgent Alerts */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Alert */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Ваша помощь нужна 
                  <span className="text-plasma-pink"> прямо сейчас!</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Получайте мгновенные уведомления о потребности в антирезусной плазме 
                  в ближайших медицинских центрах
                </p>
              </div>

              {/* Urgent Notifications */}
              <div className="space-y-4">
                {urgentNotifications.map((notification) => (
                  <Alert key={notification.id} className={`border-l-4 ${
                    notification.urgency === 'critical' 
                      ? 'border-l-blood-red bg-red-50' 
                      : 'border-l-notification-orange bg-orange-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon 
                            name={notification.urgency === 'critical' ? 'AlertTriangle' : 'Clock'} 
                            size={16} 
                            className={notification.urgency === 'critical' ? 'text-blood-red' : 'text-notification-orange'} 
                          />
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <Badge variant={notification.urgency === 'critical' ? 'destructive' : 'secondary'}>
                            {notification.timeLeft}
                          </Badge>
                        </div>
                        <AlertDescription className="text-gray-700 mb-2">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center">
                              <Icon name="MapPin" size={14} className="mr-1" />
                              {notification.location}
                            </span>
                            <span className="flex items-center">
                              <Icon name="Navigation" size={14} className="mr-1" />
                              {notification.distance}
                            </span>
                            <span className="flex items-center font-semibold text-medical-green">
                              <Icon name="DollarSign" size={14} className="mr-1" />
                              {notification.compensation}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                        </AlertDescription>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Icon name="Navigation" size={14} className="mr-1" />
                          Маршрут
                        </Button>
                        <Button size="sm" className="bg-plasma-pink hover:bg-plasma-pink/90">
                          <Icon name="Phone" size={14} className="mr-1" />
                          Звонить
                        </Button>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </div>

            {/* Doctor Image */}
            <div className="relative">
              <img
                src="/img/31e3374c-6bb6-4148-8aa8-f51816642f81.jpg"
                alt="Врач-женщина"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-plasma-pink text-white p-2 rounded-lg">
                    <Icon name="Heart" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Спасено жизней</p>
                    <p className="text-2xl font-bold text-plasma-pink">847</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="stations" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-3xl mx-auto">
              <TabsTrigger value="stations" className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>Станции</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Icon name="Bell" size={16} />
                <span>Уведомления</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <Icon name="User" size={16} />
                <span>Профиль</span>
              </TabsTrigger>
            </TabsList>

            {/* Stations Tab */}
            <TabsContent value="stations" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Станции переливания крови рядом с вами
                </h2>
                <p className="text-lg text-gray-600">
                  Актуальная информация о потребности в антирезусной плазме
                </p>
              </div>

              {/* Search Location */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Укажите ваш адрес для поиска ближайших станций..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="text-lg py-3"
                      />
                    </div>
                    <Button className="bg-medical-blue hover:bg-medical-blue/90 px-8 py-3">
                      <Icon name="MapPin" size={20} className="mr-2" />
                      Найти станции
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stations List */}
              <div className="grid gap-6">
                {nearbyStations.map((station) => (
                  <Card key={station.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-xl">{station.name}</CardTitle>
                            <Badge 
                              className={`${
                                station.status === 'urgent' 
                                  ? 'bg-blood-red text-white' 
                                  : station.status === 'needed'
                                  ? 'bg-notification-orange text-white'
                                  : 'bg-medical-green text-white'
                              }`}
                            >
                              {station.currentNeed}
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-600">
                            {station.address} • {station.distance}
                          </CardDescription>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={14}
                                  className={`${
                                    i < Math.floor(station.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {station.rating} ({station.reviews} отзывов)
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Icon name="Clock" size={16} className="mr-2 text-gray-500" />
                            {station.workingHours}
                          </div>
                          <div className="flex items-center text-sm">
                            <Icon name="Phone" size={16} className="mr-2 text-gray-500" />
                            {station.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <Icon name="RefreshCcw" size={16} className="mr-2 text-gray-500" />
                            Обновлено: {station.lastUpdate}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Требования:</p>
                          <p className="text-sm text-gray-600">{station.requirements}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Navigation" size={14} className="mr-2" />
                          Построить маршрут
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Phone" size={14} className="mr-2" />
                          Позвонить
                        </Button>
                        <Button size="sm" className="flex-1 bg-plasma-pink hover:bg-plasma-pink/90">
                          <Icon name="Calendar" size={14} className="mr-2" />
                          Записаться
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Настройка уведомлений
                </h2>
                <p className="text-lg text-gray-600">
                  Выберите типы уведомлений, которые хотите получать
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {notificationTypes.map((type) => (
                  <Card key={type.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name={type.icon as any} size={24} className={type.color} />
                          <div>
                            <CardTitle className="text-lg">{type.title}</CardTitle>
                            <CardDescription>{type.description}</CardDescription>
                          </div>
                        </div>
                        <Switch
                          checked={notifications[type.id as keyof typeof notifications]}
                          onCheckedChange={() => handleNotificationToggle(type.id)}
                        />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Settings" size={20} className="mr-2 text-medical-blue" />
                    Дополнительные настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Максимальное расстояние до станции: {maxDistance} км
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 км</span>
                        <span>50 км</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email для уведомлений</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Телефон для SMS</label>
                        <Input
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-plasma-pink hover:bg-plasma-pink/90">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить настройки
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Профиль донора
                </h2>
                <p className="text-lg text-gray-600">
                  Ваши данные и история донаций
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="User" size={20} className="mr-2 text-plasma-pink" />
                      Личная информация
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Полное имя</label>
                      <Input
                        placeholder="Введите ваше имя"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Группа крови</label>
                      <Input placeholder="Rh-" disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Возраст</label>
                      <Input placeholder="25 лет" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Домашний адрес</label>
                      <Input placeholder="Для точного поиска ближайших станций" />
                    </div>
                  </CardContent>
                </Card>

                {/* Donation Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="Activity" size={20} className="mr-2 text-medical-blue" />
                      Статистика донаций
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-plasma-pink/10 rounded-lg">
                        <div className="text-2xl font-bold text-plasma-pink mb-1">12</div>
                        <div className="text-sm text-gray-600">Всего донаций</div>
                      </div>
                      <div className="text-center p-4 bg-medical-green/10 rounded-lg">
                        <div className="text-2xl font-bold text-medical-green mb-1">3.2л</div>
                        <div className="text-sm text-gray-600">Сдано плазмы</div>
                      </div>
                      <div className="text-center p-4 bg-medical-blue/10 rounded-lg">
                        <div className="text-2xl font-bold text-medical-blue mb-1">7</div>
                        <div className="text-sm text-gray-600">Спасено жизней</div>
                      </div>
                      <div className="text-center p-4 bg-notification-orange/10 rounded-lg">
                        <div className="text-2xl font-bold text-notification-orange mb-1">18д</div>
                        <div className="text-sm text-gray-600">До след. донации</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">До статуса "Почетный донор"</span>
                        <span className="text-sm text-gray-500">28/40</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-plasma-pink h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-plasma-pink/5 to-medical-blue/5 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-plasma-pink text-white p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Heart" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Спасаем жизни</h3>
              <p className="text-sm text-gray-600">
                Ваша плазма помогает новорожденным с гемолитической болезнью
              </p>
            </div>
            <div>
              <div className="bg-medical-blue text-white p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Bell" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Мгновенные уведомления</h3>
              <p className="text-sm text-gray-600">
                Получайте уведомления о срочной потребности в реальном времени
              </p>
            </div>
            <div>
              <div className="bg-medical-green text-white p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Shield" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Безопасность</h3>
              <p className="text-sm text-gray-600">
                Все процедуры проводятся в стерильных условиях сертифицированными специалистами
              </p>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 PlasmaAlert. Служба уведомлений для доноров антирезусной плазмы. 
              <br />
              Лицензия Минздрава РФ № ЛО-77-01-000000
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}