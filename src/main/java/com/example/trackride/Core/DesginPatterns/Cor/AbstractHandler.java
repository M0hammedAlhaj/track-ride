package com.example.trackride.Core.DesginPatterns.Cor;

public abstract class  AbstractHandler<T> implements Handler<T> {

    private Handler<T> nextHandler;

    @Override
    public void setNext(Handler<T> nextHandler) {
        this.nextHandler = nextHandler;
    }

    @Override
    public void Handle(T request) {
        if (nextHandler != null) {
            nextHandler.Handle(request);
        }
    }

    public abstract void process(T request);
}
