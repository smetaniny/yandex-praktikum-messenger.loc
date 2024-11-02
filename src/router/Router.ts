import {Dictionary} from '../core';
import {routes} from '../utils';

import {Route, IRoute} from './Route';

export interface IRouter {
  // Используется для добавления маршрута с указанным путем, блоком и контекстом
  use(pathname: string, block: Dictionary, context: Dictionary): IRouter;

  // Начинает обработку маршрутов
  start(): void;

  // Перенаправляет на указанный маршрут
  go(pathname?: string): void;

  // Возвращает текущий маршрут
  getCurrentRoute(): void;

  // Возвращает пользователя на предыдущий маршрут
  back(): void;

  // Переход на следующий маршрут в истории
  forward(): void;

  // Возвращает список всех маршрутов
  routes(): IRoute[];
}

export class Router {
  // Список маршрутов
  routes: IRoute[];

  // История браузера для управления переходами
  history: History;

  // Текущий маршрут
  _currentRoute: IRoute | undefined;

  // Корневой элемент, куда будут рендериться компоненты маршрутов
  _rootQuery: string;

  // Статическое свойство для создания синглтона
  static __instance: Router | null;

  // Маршрут для страницы 404 (не найдено)
  notFoundRoute: IRoute | undefined;

  // Конструктор инициализирует маршруты, историю и текущий маршрут
  constructor(rootQuery: string) {
    // Проверяем, существует ли экземпляр, и если да, возвращаем его (реализация синглтона)
    if (Router.__instance) {
      return Router.__instance;
    }

    // Инициализация пустого массива маршрутов
    this.routes = [];
    this.history = window.history;
    this._currentRoute = undefined;
    this._rootQuery = rootQuery;

    // Сохраняем текущий экземпляр
    Router.__instance = this;
  }

  // Метод для добавления нового маршрута
  use(pathname: string, block: Dictionary, context: Dictionary = {}) {
    // Создаем новый маршрут и добавляем его в список маршрутов
    const route: IRoute = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      context,
    });
    this.routes.push(route);
    return this;
  }

  // Метод для добавления маршрута для страницы 404
  notFound(block: Dictionary, context: Dictionary = {}) {
    // Создаем и сохраняем маршрут для страницы 404
    this.notFoundRoute = new Route(`/${routes.notFound}`, block, {
      rootQuery: this._rootQuery,
      context,
    });
    return this;
  }

  // Начинает отслеживание изменений в истории
  start() {
    // Устанавливаем обработчик для события изменения истории (back/forward)
    window.onpopstate = (event: PopStateEvent & { currentTarget: Window }) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    // Инициализируем текущий маршрут в соответствии с текущим URL
    this._onRoute(window.location.pathname);
  }

  // Обработчик перехода на новый маршрут
  _onRoute(pathname: string) {
    // Находим маршрут, соответствующий указанному пути
    const route = this.getRoute(pathname);

    // Если текущий маршрут существует и отличается от нового, вызываем leave
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    // Если маршрут не найден, перенаправляем на 404
    if (!route) {
      this.notFoundRoute?.navigate(`/${routes.notFound}`);
    } else {
      // Устанавливаем текущий маршрут и выполняем навигацию
      this._currentRoute = route;
      try {
        route.navigate(pathname);
      } catch (e) {
        // При ошибке перенаправляем на маршрут 404
        this._currentRoute = this.notFoundRoute;
        this.notFoundRoute?.navigate(`/${routes.notFound}`);
      }
    }
  }

  // Переход на указанный путь
  go(pathname?: string) {
    // Если путь указан, обновляем историю и обрабатываем маршрут
    if (pathname) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    } else {
      // Если путь не указан, просто переходим в истории
      this.history.go();
    }
  }

  // Возвращает маршрут, соответствующий указанному пути
  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  // Возвращает текущий маршрут
  getCurrentRoute() {
    return this._currentRoute;
  }

  // Переход на предыдущую страницу в истории
  back() {
    this.history.back();
  }

  // Переход на следующую страницу в истории
  forward() {
    this.history.forward();
  }
}
