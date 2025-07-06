package com.example.trackride.Core.DesginPatterns.Cor;

public interface Handler<T> {


     void setNext(Handler<T> nextHandler);
     void handle(T request);
}
