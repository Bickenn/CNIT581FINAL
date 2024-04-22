from django.urls import path

from . import views

#creates url paths for all of the webpages
urlpatterns = [
    path('', views.index, name='index'),
	path('news-article-1/', views.news_article_one, name='newsArticle1'),
    path('news-article-2/', views.news_article_two, name='news_article_2'),
	path('breakout/', views.breakoutGame, name='breakout'),
    path('snake/', views.snakeGame, name='snake'),
	path('byteblend/', views.byteBlend, name='byteBlend'),
	path('infinifit/', views.infinifit, name='infinifit'),
    path('admin-login/', views.adminLogin, name='adminLogin'),
    path('admin-page/', views.adminPage, name='adminPage'),
    path('add-user/', views.addUser, name = 'addUser'),
]