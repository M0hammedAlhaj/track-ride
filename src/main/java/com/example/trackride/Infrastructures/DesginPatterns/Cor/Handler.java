package com.example.trackride.Infrastructures.DesginPatterns.Cor;

public interface Handler<T> {


     void setNext(Handler<T> nextHandler);
     void handle(T request);
}
